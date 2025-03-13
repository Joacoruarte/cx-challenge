import { getQueryClient } from '@/lib/get-query-client';
import { CharacterResponse } from '@/models/character';
import { Episode } from '@/models/episodes';
import { CharacterStore, useCharacterStore } from '@/stores/characters.store';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook } from '@testing-library/react';

// render con wrapper para react query
export function renderWithProviders(
  ui: React.ReactElement,
  options = {
    queryClient: getQueryClient(),
  }
) {
  const queryClient = options.queryClient;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// renderHook con wrapper para react query
export function renderHookWithProviders<T>(
  hook: () => T,
  options = {
    queryClient: getQueryClient(),
  }
) {
  const queryClient = options.queryClient;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return renderHook<T, T>(hook, { wrapper: Wrapper });
}

// Configuración inicial del estado de los personajes en el store de zustand
export const setupMockCharacterStore = () => {
  const mockSetCharacter1 = jest.fn((character) => {
    mockStore.character1 = character;
  });

  const mockSetCharacter2 = jest.fn((character) => {
    mockStore.character2 = character;
  });

  // eslint-disable-next-line prefer-const
  let mockStore: CharacterStore = {
    character1: null,
    character2: null,
    setCharacter1: mockSetCharacter1,
    setCharacter2: mockSetCharacter2,
  };

  // Mock del hook useCharacterStore
  (useCharacterStore as unknown as jest.Mock).mockReturnValue(mockStore);

  return { mockSetCharacter1, mockSetCharacter2, mockStore };
};

export const mockFullCharactersResponse: CharacterResponse = {
  info: {
    count: 826,
    pages: 42,
    next: '',
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: '/placeholder.webp',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      created: new Date().toISOString(),
      url: 'https://rickandmortyapi.com/api/character/1',
      gender: 'Male',
      type: 'Human',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '/placeholder.webp',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/3',
      ],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:50:21.651Z',
    },
  ],
};

export const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: ['https://rickandmortyapi.com/api/character/1'],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
    characters: ['https://rickandmortyapi.com/api/character/1'],
    url: 'https://rickandmortyapi.com/api/episode/2',
    created: '2017-11-10T12:56:33.916Z',
  },
  {
    id: 3,
    name: 'Anatomy Park',
    air_date: 'December 16, 2013',
    episode: 'S01E03',
    characters: ['https://rickandmortyapi.com/api/character/2'],
    url: 'https://rickandmortyapi.com/api/episode/3',
    created: '2017-11-10T12:56:33.916Z',
  }
];
