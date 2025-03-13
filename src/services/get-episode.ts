import { Episode } from '@/models/episodes';

export const getEpisode = async (url: string): Promise<Episode> => {
  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      const id = url.split('/').pop();
      throw new Error(`Error fetching episode: ${id}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
