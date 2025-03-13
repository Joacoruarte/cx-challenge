import { getEpisode } from '@/services/get-episode';

describe('getEpisode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return episode data on successful fetch', async () => {
    const mockData = { id: 1, name: 'Pilot' };
    const url = 'https://rickandmortyapi.com/api/episode/1';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getEpisode(url);
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error with message when fetch fails', async () => {
    const url = 'https://rickandmortyapi.com/api/episode/1';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    try {
      await getEpisode(url);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error fetching episode: 1');
      }
    }
  });

  it('should throw error when there is a network error', async () => {
    const url = 'https://rickandmortyapi.com/api/episode/1';
    global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    try {
      await getEpisode(url);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Network Error');
      }
    }
  });
});
