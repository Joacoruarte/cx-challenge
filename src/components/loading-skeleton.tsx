import React from 'react';
import { Navbar } from './navbar';
import CharacterCardList from './characters/character-card-list';
import { Character } from '@/models/character';
import EpisodesTable from './episodes/episodes-table';

export default function LoadingSkeleton() {
  return (
    <div className='min-h-screen flex flex-col text-gray-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 dark:text-white transition-colors'>
      <Navbar />
      <div className='flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full'>
        {/* fake character sections */}
        <div className='flex flex-col md:flex-row gap-8 mb-8 relative'>
          <CharacterCardList loading characters={[] as Character[]} title='' />
          <CharacterCardList loading characters={[] as Character[]} title='' />
        </div>

        {/* fake pagination */}
        <div className='mb-8'>
          <div className='flex items-center justify-center space-x-1'>
            <button className='p-2 rounded-md border border-indigo-200 bg-white text-primary hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed'>
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className='w-8 h-8 rounded-md flex items-center justify-center bg-white text-primary hover:bg-indigo-50 border border-indigo-200'
              >
                {page}
              </button>
            ))}
            <button className='p-2 rounded-md border border-indigo-200 bg-white text-primary hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed'>
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* fake episodes section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <EpisodesTable
            episodes={[]}
            tableTitle='Character #1 - Only Episodes'
            loading
          />

          <EpisodesTable
            episodes={[]}
            tableTitle='Character #1 - Only Episodes'
            loading
          />

          <EpisodesTable
            episodes={[]}
            tableTitle='Character #1 - Only Episodes'
            loading
          />
        </div>
      </div>
    </div>
  );
}
