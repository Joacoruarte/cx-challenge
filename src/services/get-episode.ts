import { Episode } from "@/models/episodes";

export const getEpisode = async (url: string): Promise<Episode> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching episode');
  }
  return response.json();
};