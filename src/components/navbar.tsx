'use client'
import { useCharacterStore } from '@/stores/characters.store';
import ThemeToggle from './toggle-theme';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function Navbar() {
  const { character1, character2, setCharacter1, setCharacter2 } = useCharacterStore()
  const isNotCharactersSelected = !character1 && !character2

  const resetCharacters = () => {
    setCharacter1(undefined)
    setCharacter2(undefined)
    toast.success('Characters reset')
  }

  return (
    <>
      {/* Modern browser header */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 p-3 flex items-center space-x-3 text-white shadow-md' />

      {/* App header */}
      <div className='bg-white/80 backdrop-blur-md border-b border-indigo-100 py-3 px-6 flex justify-between items-center dark:bg-gray-800 gap-2'>
        <h1 className='sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-purple-300'>
          Compare Rick and Morty Characters
        </h1>

        <div className='flex sm:space-x-2'>
          <Button
            variant={'outline'}
            className='sm:text-sm text-[13px] bg-gradient-to-br from-indigo-500 to-purple-500 text-white dark:from-indigo-400 dark:to-purple-400 hover:text-white cursor-pointer'
            onClick={resetCharacters}
            disabled={isNotCharactersSelected}
          >
            Reset Characters
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
