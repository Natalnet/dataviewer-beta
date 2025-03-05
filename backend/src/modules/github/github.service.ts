import { Injectable } from '@nestjs/common';
@Injectable()
export class GithubService {
  async searchRepositories(query: string): Promise<any> {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API Error');
    }
    return response.json();
  }
}
