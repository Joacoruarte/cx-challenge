'use client';
import { usePagination } from '@/hooks/pagination/use-pagination';
import { CharacterResponse } from '@/models/character';
import { getCharacters } from '@/services/get-characters';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CustomPaginations } from '../custom-pagination';
import { CharacterCardList } from './character-card-list';
import CharactersSelectedReminder from './characters-selected-reminder';

export function CharactersSection({
  defaultPage = '1',
}: {
  defaultPage?: string;
}) {
  const { page, onPageChange } = usePagination(defaultPage);
  const { data, isLoading, isError } = useSuspenseQuery<CharacterResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isError) {
    return <div>There was an error fetching the data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const characters = data?.results;
  const pages = data?.info?.pages;
  const mid = characters ? Math.ceil(characters.length / 2) : 0;
  const character1List = characters ? characters.slice(0, mid) : [];
  const character2List = characters ? characters.slice(mid) : [];

  return (
    <>
      {characters && (
        <CharactersSelectedReminder
          characters={characters}
          onPageChange={onPageChange}
        />
      )}

      <div className='min-h-[610px]'>
        <div className='flex flex-col md:flex-row gap-8 mb-8 relative w-full min-h-[600px]'>
          <CharacterCardList
            currentPage={Number(page)}
            characters={character1List}
          />
          <CharacterCardList
            currentPage={Number(page)}
            characters={character2List}
          />
        </div>
      </div>

      <div className='mb-8'>
        <CustomPaginations
          currentPage={Number(page)}
          totalPages={pages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
