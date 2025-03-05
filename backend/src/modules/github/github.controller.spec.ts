import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('./github.service'); 

describe('GithubController', () => {
  let controller: GithubController;
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [GithubService],
    }).compile();

    controller = module.get<GithubController>(GithubController);
    service = module.get<GithubService>(GithubService);
  });

  describe('searchRepositories', () => {
    it('deve retornar repositórios', async () => {
      const mockResponse = {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 10270250,
            name: "react",
            full_name: "facebook/react",
            description: "The library for web and native user interfaces.",
          },
        ],
      };

      service.searchRepositories = jest.fn().mockResolvedValue(mockResponse);

      const query = 'react';
      const result = await controller.searchRepositories(query);

      expect(result).toEqual(mockResponse);
    });
  });
});
