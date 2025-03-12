'use client';
import { CharacterResponse } from '@/models/character';
import { getCharacters } from '@/services/get-characters';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CustomPaginations } from '../custom-pagination';
import CharacterCardList from './character-card-list';
import CharactersSelectedReminder from './characters-selected-reminder';

export function CharactersSection({
  defaultPage = '1',
}: {
  defaultPage?: string;
}) {
  const [page, setPage] = useState(defaultPage);

  const { data, isFetching, isError } = useSuspenseQuery<CharacterResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isError) {
    return <div>There was an error fetching the data</div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const characters = data.results;
  const pages = data.info.pages;
  const mid = Math.ceil(characters.length / 2);
  const character1List = characters.slice(0, mid);
  const character2List = characters.slice(mid);

  const handlePageChange = (newPage: number) => {
    window.history.pushState({}, '', `?page=${newPage}`);
    setPage(String(newPage));
  };

  return (
    <>
      {characters && (
        <CharactersSelectedReminder
          characters={characters}
          onPageChange={handlePageChange}
        />
      )}

      <div className='flex flex-col md:flex-row gap-8 mb-8 relative min-h-[630px]'>
        <CharacterCardList
          currentPage={Number(page)}
          characters={character1List}
          title='Character #1'
        />
        <CharacterCardList
          currentPage={Number(page)}
          characters={character2List}
          title='Character #2'
        />
      </div>

      <div className='mb-8'>
        <CustomPaginations
          currentPage={Number(page)}
          totalPages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
