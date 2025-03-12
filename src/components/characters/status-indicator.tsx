import { cn } from '@/lib/utils';
import { Character } from '@/models/character';
import React from 'react';

export function StatusIndicator({ status }: { status: Character['status'] }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Alive':
        return 'bg-green-400';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className='relative'>
      {status === 'Alive' && (
        <div className='absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75'></div>
      )}
      <div
        className={cn(
          'w-4 h-4 rounded-full border-2 border-white dark:border-slate-700',
          getStatusStyles()
        )}
      >
        {status === 'Dead' && (
          <span className='absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold'>
            ×
          </span>
        )}
        {status === 'unknown' && (
          <span className='absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold'>
            ?
          </span>
        )}
      </div>
    </div>
  );
}
