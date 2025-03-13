import { Character } from '@/models/character';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CharacterStore = {
  character1: Character | null;
  character2: Character | null;
  setCharacter1: (character: Character | undefined) => void;
  setCharacter2: (character: Character | undefined) => void;
};

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      character1: null,
      character2: null,
      setCharacter1: (character) => set({ character1: character }),
      setCharacter2: (character) => set({ character2: character }),
    }),
    {
      name: 'character-store',
    }
  )
);
