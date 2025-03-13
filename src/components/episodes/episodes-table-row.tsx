import { Episode } from '@/models/episodes';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

export function EpisodesTableRow({
  episode,
  highlight = false,
}: {
  episode: Episode;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      data-testid={`episode-row-${episode.id}`}
      className={`p-3 hover:bg-indigo-50 dark:hover:bg-indigo-800 dark:bg-indigo-900 dark:border-gray-700 transition-colors ${
        highlight
          ? 'bg-purple-50 dark:bg-purple-900 dark:hover:bg-purple-800'
          : ''
      }`}
    >
      <div className='flex items-center'>
        <Badge
          variant='outline'
          className={`mr-2 ${
            highlight
              ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-700'
              : 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-800 dark:text-indigo-200 dark:border-indigo-700'
          }`}
        >
          {episode.episode}
        </Badge>
        <span className='font-medium'>{episode.name}</span>
      </div>
      <div className='text-sm text-gray-500 mt-1 italic dark:text-gray-400'>
        {episode.air_date}
      </div>
    </motion.div>
  );
}
