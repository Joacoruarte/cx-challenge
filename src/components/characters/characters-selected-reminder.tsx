import { Character } from '@/models/character';
import { useCharacterStore } from '@/stores/characters.store';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterAvatar from './character-avatar';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Fragment } from 'react';

function CharacterSelectedCard({
  character,
  onRemoveCharacter,
  onPageChange,
}: {
  character: Character;
  onRemoveCharacter: () => void;
  onPageChange: (newPage: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='sticky top-4 z-20 mb-6'
    >
      <div className='flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-indigo-100 dark:border-slate-700'>
        <div className='flex items-center gap-2'>
          <CharacterAvatar
            image={character.image}
            name={character.name}
            status={character.status}
          />
          <span className='font-medium'>
            <b>{character.name}</b> is selected but not in the current list.
          </span>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={onRemoveCharacter}
            className='flex items-center gap-1 transition-colors cursor-pointer'
          >
            <Trash2 size={14} />
            Remove
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='flex items-center gap-1 transition-colors cursor-pointer'
            onClick={() => {
              if (character.currentPage) {
                onPageChange(character.currentPage);
              } else {
                toast.error('Character page not found');
              }
            }}
          >
            See character page
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CharactersSelectedReminder({
  characters,
  onPageChange,
}: {
  characters: Character[];
  onPageChange: (newPage: number) => void;
}) {
  const { character1, character2, setCharacter1, setCharacter2 } =
    useCharacterStore();
  const isCharacter1NotInShowedList =
    character1 && !characters.some((c) => c.id === character1?.id);
  const isCharacter2NotInShowedList =
    character2 && !characters.some((c) => c.id === character2?.id);

  return (
    <AnimatePresence>
      <Fragment>
        {isCharacter1NotInShowedList && (
          <CharacterSelectedCard
            character={character1}
            onPageChange={onPageChange}
            onRemoveCharacter={() => {
              setCharacter1(undefined);
            }}
          />
        )}

        {isCharacter2NotInShowedList && (
          <CharacterSelectedCard
            character={character2}
            onPageChange={onPageChange}
            onRemoveCharacter={() => {
              setCharacter2(undefined);
            }}
          />
        )}
      </Fragment>
    </AnimatePresence>
  );
}
