'use client';
import React from 'react';
import { Navbar } from './navbar';
import { CharacterCardList } from './characters/character-card-list';
import { Character } from '@/models/character';
import EpisodesTable from './episodes/episodes-table';
import { CustomPaginations } from './custom-pagination';

export function CharactersSectionSkeleton() {
  return (
    <div className='min-h-[610px]'>
      <div className='flex flex-col md:flex-row gap-8 mb-8 relative w-full'>
        <CharacterCardList loading characters={[] as Character[]} />
        <CharacterCardList loading characters={[] as Character[]} />
      </div>
    </div>
  );
}

export function EpisodesSectionSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <EpisodesTable episodes={[]} tableTitle='' loading />
      <EpisodesTable episodes={[]} tableTitle='' loading />
      <EpisodesTable episodes={[]} tableTitle='' loading />
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className='mb-8 pointer-events-none'>
      <CustomPaginations
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        loading
      />
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className='min-h-screen flex flex-col text-gray-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 dark:text-white transition-colors'>
      <Navbar />
      <div className='flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full'>
        <CharactersSectionSkeleton />
        <PaginationSkeleton />
        <EpisodesSectionSkeleton />
      </div>
    </div>
  );
}
