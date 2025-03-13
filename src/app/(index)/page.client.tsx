'use client';

import { CharactersSection } from '@/components/characters/characters-section';
import EpisodesTable from '@/components/episodes/episodes-table';
import { Navbar } from '@/components/navbar';
import { useGetSelectedCharactersEpisodes } from '@/hooks/characters/use-get-selected-characters-episodes';
import { useCharacterStore } from '@/stores/characters.store';

export default function CharacterComparison({
  defaultPage,
}: {
  defaultPage: string;
}) {
  const { character1, character2 } = useCharacterStore();

  const {
    hasCharacter1,
    hasCharacter2,
    hasBothCharacters,
    character1Episodes,
    character2Episodes,
    sharedEpisodes,
  } = useGetSelectedCharactersEpisodes();

  return (
    <div className='min-h-screen flex flex-col text-gray-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 dark:text-white transition-colors'>
      <Navbar />

      {/* Main content */}
      <div className='flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full'>
        {/* Character sections */}
        <CharactersSection defaultPage={defaultPage} />

        {/* Episodes section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 relative w-full'>
          {/* Character #1 Episodes */}
          <EpisodesTable
            episodes={character1Episodes}
            tableTitle={`${character1?.name || 'Character #1'} - Only Episodes`}
            noDataMessage={
              hasCharacter1 ? 'No episodes founded' : 'Select a character'
            }
          />

          {/* Shared Episodes */}
          <EpisodesTable
            episodes={sharedEpisodes}
            highlighted
            tableTitle='Shared Episodes'
            tableHeaderClass='from-purple-500 to-purple-600 '
            noDataMessage={
              hasBothCharacters
                ? 'No shared episodes founded'
                : 'Select two characters to compare'
            }
          />

          {/* Character #2 Episodes */}
          <EpisodesTable
            episodes={character2Episodes}
            tableTitle={`${character2?.name || 'Character #2'} - Only Episodes`}
            tableHeaderClass='from-indigo-500 to-indigo-600'
            noDataMessage={
              hasCharacter2 ? 'No episodes founded' : 'Select a character'
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div className='bg-white/80 backdrop-blur-md border-t border-indigo-100 p-4 text-center text-sm text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'>
        RickAndMortyApp © 2025 • Compare your favorite characters from the show.
      </div>
    </div>
  );
}
