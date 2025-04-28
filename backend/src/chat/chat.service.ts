import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import 'dotenv/config';
import { PandaScoreService } from '../pandascore/pandascore.service';

@Injectable()
export class ChatService {
  constructor(private readonly panda: PandaScoreService) {}

  private async buildKnowledge(): Promise<string> {
    const teams = await this.panda.getTeamByName('FURIA');
    if (!teams || teams.length === 0) {
      throw new Error('Time FURIA não encontrado.');
    }

    const team = teams[0];
    const allMatches = await this.panda.getPastMatches();
    const teamMatches = allMatches
      .filter(m => m.opponents.some(o => o.opponent.id === team.id))
      .slice(0, 5);

    const roster = team.players
      ? team.players
          .map(p => `- ${p.name}${p.role ? ` (${p.role})` : ''}`)
          .join('\n')
      : 'Elenco não disponível.';

    const stats = [
      `Rank mundial: ${team.rank ?? 'Desconhecido'}`,
      `Vitórias: ${team.wins ?? 0}`,
      `Derrotas: ${team.losses ?? 0}`,
      `Partidas jogadas: ${team.matches ?? 0}`
    ].join('\n');

    const recent = teamMatches.length > 0
      ? teamMatches
          .map(m => `- ${m.opponents.map(o => o.opponent.name).join(' vs ')}: ${m.status}`)
          .join('\n')
      : 'Nenhum jogo recente encontrado.';

    return [
      `Time: ${team.name}`,
      '',
      `Elenco:`,
      roster,
      '',
      `Estatísticas:`,
      stats,
      '',
      `Últimos jogos:`,
      recent
    ].join('\n');
  }

  public async ask(question: string): Promise<string> {
    const knowledge = await this.buildKnowledge();
    const prompt = `${knowledge}\n\nUsuário: ${question}\nAssistente:`;
    const model = process.env.OLLAMA_MODEL;

    console.log('Comando gerado:', `ollama run ${model} "${prompt.replace(/"/g, '\\"')}"`);

    return new Promise((resolve, reject) => {
      exec(
        `ollama run ${model} "${prompt.replace(/"/g, '\\"')}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error('Erro ao executar o comando:', error);
            return reject(error);
          }
          resolve(stdout.trim());
        }
      );
    });
  }
}