import { Character } from '@/models/character';
import { CharacterCard } from './character-card';

export default function CharacterCardList({
  characters,
  title,
  loading,
  currentPage
}: {
  characters: Character[];
  title: string;
  loading?: boolean;
  currentPage?: number
}) {
  return (
    <div className='w-full md:w-1/2 bg-white rounded-xl shadow-lg p-4 border border-indigo-100 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-between items-center mb-4'>
        {loading ? (
          <div className='w-1/4 h-6 bg-indigo-100 dark:bg-gray-700 rounded' />
        ) : (
          <h2 className='text-xl font-bold text-indigo-800 dark:text-indigo-300'>
            {title}
          </h2>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='bg-gradient-to-br from-white to-indigo-50 rounded-lg overflow-hidden border border-indigo-100 shadow-sm dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-md'
              >
                <div className='animate-pulse flex p-3'>
                  <div className='mr-3'>
                    <div className='w-16 h-16 rounded-full bg-indigo-100' />
                  </div>
                  <div className='flex-1 space-y-2 py-1'>
                    <div className='w-4/5 h-4 bg-indigo-100 dark:bg-gray-700 rounded' />
                    <div className='w-3/4 h-3 bg-indigo-100 dark:bg-gray-700 rounded' />
                  </div>
                </div>
              </div>
            ))
          : characters.map((character) => (
              <CharacterCard key={character.id} character={character} currentPage={currentPage} />
            ))}
      </div>
    </div>
  );
}
