import { getCharacters } from '@/services/get-characters';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('getCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return characters data on successful fetch', async () => {
    const mockData = { results: [{ name: 'Rick Sanchez' }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getCharacters('1');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return empty array and show error toast on failed fetch response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getCharacters('1');
    expect(result).toEqual([]);
    expect(toast.error).toHaveBeenCalledWith('Error fetching characters');
  });

  it('should return empty array and show error toast on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    const result = await getCharacters('1');
    expect(result).toEqual([]);
    expect(toast.error).toHaveBeenCalledWith('An error occurred while fetching characters');
  });
});
