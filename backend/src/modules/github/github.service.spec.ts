import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;

  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      items: [{ name: 'react', full_name: 'facebook/react' }],
    }),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        {
          provide: 'fetch', 
          useValue: mockFetch,
        },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchRepositories', () => {
    it('should return a list of repositories', async () => {
      const query = 'react';
      const result = await service.searchRepositories(query);

      expect(result).toHaveProperty('items'); 
      expect(Array.isArray(result.items)).toBe(true); 
      expect(result.items[0]).toHaveProperty('name', 'react');
      expect(result.items[0]).toHaveProperty('full_name', 'facebook/react');
    });
  });
});
