export async function getCharacters(page: string) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, { cache: 'no-store' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
