
import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github') 
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('search')
  async searchRepositories(@Query('q') query: string) {
    return this.githubService.searchRepositories(query);
  }
}
