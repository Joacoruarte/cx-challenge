import { Episode } from '@/models/episodes';

export const getEpisode = async (url: string): Promise<Episode> => {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    const id = url.split('/').pop();
    throw new Error(`Error fetching episode: ${id}`);
  }

  return response.json();
};
