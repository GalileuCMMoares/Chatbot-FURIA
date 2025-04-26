// backend/src/pandascore/pandascore.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class PandaScoreService {
  private readonly baseUrl = 'https://api.pandascore.co/csgo';
  private readonly apiKey = process.env.PANDASCORE_API_KEY;

  async getTeamByName(name: string): Promise<any[]> {
    const { data } = await axios.get(`${this.baseUrl}/teams`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      params: { search: name },
    });
    return data;
  }

  async getPastMatches(): Promise<any[]> {
    const { data } = await axios.get(`${this.baseUrl}/matches/past`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    return data;
  }
}
