'use client';
import { Episode } from '@/models/episodes';
import React, { useEffect, useState } from 'react';
import { EpisodesTableRow } from './episodes-table-row';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { searchResults } from '@/lib/search-results';

interface EpisodesTableProps {
  episodes: Episode[];
  loading?: boolean;
  tableTitle: string;
  tableHeaderClass?: string;
  highlighted?: boolean;
  noDataMessage?: string;
}

export default function EpisodesTable({
  episodes,
  loading,
  tableTitle,
  tableHeaderClass,
  highlighted = false,
  noDataMessage,
}: EpisodesTableProps) {
  const [seachTerm, setSearchTerm] = useState('');
  const [renderedEpisodes, setRenderedEpisodes] = useState<Episode[]>(episodes);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);    
    const results = searchResults(e.target.value, episodes, 'name');
    setRenderedEpisodes(results);
  };

  useEffect(() => {
    setRenderedEpisodes(episodes);
  }, [episodes]);

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 dark:bg-gray-800 dark:border-gray-700'>
      {loading ? (
        <div className='w-full h-10 bg-indigo-100 dark:bg-gray-700 rounded-tl rounded-tr' />
      ) : (
        <div
          className={cn(
            'flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 p-3 h-24 text-white font-bold',
            tableHeaderClass
          )}
        >
          <div className='flex flex-col'>
            <p className='font-bold max-w-[200px] sm:text-sm text-[13px]'>{tableTitle}</p>
            <span className='font-light text-sm'>
              Episodes: {renderedEpisodes?.length}
            </span>
          </div>

          <Input
            placeholder='Search episodes...'
            onChange={handleSearch}
            value={seachTerm}
            className='max-w-[150px] border-indigo-200 focus:border-indigo-500 placeholder:text-gray-300'
            data-testid='search-episodes'
          />
        </div>
      )}
      <div className='divide-y divide-indigo-100 max-h-[450px] overflow-y-auto min-h-[450px]'>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='p-[1.15rem] animate-pulse'>
              <div className='w-4/5 h-4 bg-indigo-100 dark:bg-gray-700 rounded' />
              <div className='w-3/4 h-3 bg-indigo-100 dark:bg-gray-700 rounded' />
            </div>
          ))
        ) : renderedEpisodes?.length === 0 ? (
          <div className='p-3 min-h-[450px] flex items-center justify-center text-center text-gray-500 dark:text-gray-400'>
            {noDataMessage || 'No episodes found'}
          </div>
        ) : (
          renderedEpisodes?.map((episode, index) => (
            <EpisodesTableRow
              key={index}
              episode={episode}
              highlight={highlighted}
            />
          ))
        )}
      </div>
    </div>
  );
}
