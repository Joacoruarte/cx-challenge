'use client';
import { cn } from '@/lib/utils';
import { Character } from '@/models/character';
import { useCharacterStore } from '@/stores/characters.store';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import CharacterAvatar from './character-avatar';

export function CharacterCard({ character, currentPage }: { character: Character, currentPage?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { character1, character2, setCharacter1, setCharacter2 } = useCharacterStore();
  const isSelected = character1?.id === character.id || character2?.id === character.id;

  const handleSelect = (character: Character, currentPage?: number) => {
    // Si ya está seleccionado, lo removemos
    if (isSelected) {
      if (character1?.id === character.id) return setCharacter1(undefined);
      if (character2?.id === character.id) return setCharacter2(undefined);
    }
    
    // Si hay espacio, lo asignamos al primer slot vacío
    if (!character1) return setCharacter1({ ...character, currentPage });
    if (!character2) return setCharacter2({ ...character, currentPage });

    // Si ya hay dos personajes seleccionados, mostramos error
    toast.error('You can only select two characters at a time');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='cursor-pointer relative bg-gradient-to-br from-white to-indigo-50 rounded-lg overflow-visible border border-indigo-100 shadow-sm hover:shadow-md transition-shadow dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-md'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`character-card-${character.id}`}
      onClick={(e) => {
        e.stopPropagation();
        handleSelect(character, currentPage);
      }}
    >
      {/* Selection indicator */}
      <div
        data-testid='selection-indicator'
        className={cn(
          'indicator-container absolute -top-2 -right-2 transition-all z-10 duration-300 transform',
          isSelected ? 'scale-100' : 'scale-0'
        )}
      >
        <div className='relative'>
          <div className='absolute inset-0 bg-primary rounded-full animate-ping opacity-30'></div>
          <div className='relative bg-primary text-white dark:text-black p-1.5 rounded-full'>
            <Check size={16} data-testid="lucide-check"/>
          </div>
        </div>
      </div>

      <div className='flex p-3'>
        <div className='mr-3'>
          <CharacterAvatar
            image={character.image}
            name={character.name}
            status={character.status}
          />
        </div>
        <div className='flex-1'>
          <h3 className='font-bold text-indigo-900 dark:text-indigo-200'>
            {character.name}
          </h3>
          <div className='flex items-center mt-1'>
            <Badge
              variant='outline'
              className={`mr-2 ${
                character.status === 'Alive'
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : character.status === 'Dead'
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }`}
            >
              {character.status}
            </Badge>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {character.species}
            </span>
          </div>

          {/* Plus icon appears on hover */}
          <div
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300',
              isHovered && !isSelected
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            )}
          >
            <div className='text-primary hover:text-primary/80 p-2'>
              <Plus size={20} fill={isSelected ? 'currentColor' : 'none'} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
