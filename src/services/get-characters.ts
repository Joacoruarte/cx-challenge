import { toast } from 'sonner';

export async function getCharacters(page: string) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      if (typeof window !== 'undefined') {
        toast.error('Error fetching characters');
      }

      return [];
    }

    return await response.json();
  } catch {
    if (typeof window !== 'undefined') {
      toast.error('An error occurred while fetching characters');
    }

    return [];
  }
}
