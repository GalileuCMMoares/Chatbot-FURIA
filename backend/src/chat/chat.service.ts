import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import 'dotenv/config';
import { PandaScoreService } from '../pandascore/pandascore.service';

@Injectable()
export class ChatService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor(private readonly panda: PandaScoreService) {}

  private async buildKnowledge(): Promise<string> {
    const teams = await this.panda.getTeamByName('FURIA');
    const team = teams[0];

    const allMatches = await this.panda.getPastMatches();
    const teamMatches = allMatches
      .filter((match: any) =>
        match.opponents.some((opp: any) => opp.opponent.id === team.id)
      )
      .slice(0, 5);

    const roster = team.players
      .map((p: any) => `- ${p.name}${p.role ? ` (${p.role})` : ''}`)
      .join('\n');

    const stats = [
      `Rank mundial: ${team.rank}`,
      `Vitórias: ${team.wins}`,
      `Derrotas: ${team.losses}`,
      `Partidas jogadas: ${team.matches}`,
    ].join('\n');

    const recent = teamMatches
      .map((m: any) =>
        `- ${m.opponents.map((o: any) => o.opponent.name).join(' vs ')}: ${m.status}`
      )
      .join('\n');

    return `
Time: ${team.name}

Elenco:
${roster}

Estatísticas:
${stats}

Últimos jogos:
${recent}
`;
  }

  public async ask(question: string): Promise<string> {
    const knowledge = await this.buildKnowledge();
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `Você é um assistente sobre FURIA CS. Use estes dados:\n\n${knowledge}` },
          { role: 'user', content: question },
        ],
        max_tokens: 300,
      });
      const messageContent = completion.choices[0]?.message?.content;
      if (!messageContent) {
        throw new Error('A resposta da OpenAI está vazia ou inválida.');
      }
      return messageContent.trim();
    } catch (err: any) {
      if (err.code === 'insufficient_quota') {
        return 'Desculpe, no momento excedi minha cota de uso da OpenAI. Tente novamente mais tarde.';
      }
      throw err;
    }
  }
}
