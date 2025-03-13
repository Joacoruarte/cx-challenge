import { CharactersSection } from '@/components/characters/characters-section';
import { getQueryClient } from '@/lib/get-query-client';
import { CharacterStore, useCharacterStore } from '@/stores/characters.store';
import { mockFullCharactersResponse, renderWithProviders, setupMockCharacterStore } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

jest.mock('@/stores/characters.store', () => ({
  useCharacterStore: jest.fn(),
}));

describe('CharactersSection', () => {
  let mockSetCharacter1: jest.Func;
  let mockSetCharacter2: jest.Func;
  let mockStore: CharacterStore;

  beforeEach(() => {
    // Configuramos el estado mock antes de cada test
    jest.clearAllMocks();
    const characterStoreConfig = setupMockCharacterStore()
    mockSetCharacter1 = characterStoreConfig.mockSetCharacter1;
    mockSetCharacter2 = characterStoreConfig.mockSetCharacter2;
    mockStore = characterStoreConfig.mockStore;
  });


  it('renders with a page in range', () => {
    // Paso 1: Configurar el mock para devolver los datos de prueba
    const queryClient = getQueryClient();
    queryClient.setQueryData(['characters', '42'], mockFullCharactersResponse);

    // Paso 2: Renderizar el componente con la página 42
    renderWithProviders(<CharactersSection defaultPage='42' />, {
      queryClient,
    });

    // Paso 3: Verificar que Rick Sanchez está en la pantalla
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('renders error with a page out of range', () => {
    // Paso 1: Configurar el mock para devolver un error
    const queryClient = getQueryClient();
    queryClient.setQueryData(['characters', '43'], []);
    queryClient.getQueryState(['characters', '43'])!.status = 'error';
    queryClient.getQueryState(['characters', '43'])!.error = new Error(
      'Simulated error'
    );

    // Paso 2: Renderizar el componente con la página 43
    renderWithProviders(<CharactersSection defaultPage='43' />, {
      queryClient,
    });

    // Paso 3: Verificar que el mensaje de error se muestra en la pantalla
    expect(
      screen.getByText(/There was an error fetching the data/i)
    ).toBeInTheDocument();
  });

  it('Select two characters and store them in zustand store', () => {
    // Paso 1: Configurar el mock para devolver los datos de prueba
    const queryClient = getQueryClient();
    queryClient.setQueryData(['characters', '1'], mockFullCharactersResponse);

    // Paso 2: Renderizar el componente con la página 1
    const { rerender } = renderWithProviders(<CharactersSection defaultPage='1' />, {
      queryClient,
    });

    // Verificar que Rick Sanchez y Morty Smith están en la página
    const rickSanchez = screen.getByText(/Rick Sanchez/i);
    const mortySmith = screen.getByText(/Morty Smith/i);

    expect(rickSanchez).toBeInTheDocument();
    expect(mortySmith).toBeInTheDocument();

    // Paso 3: Simular clic en ambas characters card
    const rickCard = rickSanchez.closest('div[data-testid="character-card-1"]');
    fireEvent.click(rickCard as Element);

    (useCharacterStore as unknown as jest.Mock).mockImplementation(() => mockStore);
    // Verificar que se llamó a setCharacter1 con Rick Sanchez
    expect(mockSetCharacter1).toHaveBeenCalledWith({ ...mockFullCharactersResponse.results[0], currentPage: 1 });
    
    rerender(<CharactersSection defaultPage='1' />);
       
    const mortyCard = mortySmith.closest('div[data-testid="character-card-2"]');
    fireEvent.click(mortyCard as Element);

    (useCharacterStore as unknown as jest.Mock).mockImplementation(() => mockStore);
    // Verificar que se llamó a setCharacter2 con Morty Smith
    expect(mockSetCharacter2).toHaveBeenCalledWith({ ...mockFullCharactersResponse.results[1], currentPage: 1 });

    // Paso 4: Verificar que ambos personajes están seleccionados
    expect(mockStore.character1).toEqual({ ...mockFullCharactersResponse.results[0], currentPage: 1 });
    expect(mockStore.character2).toEqual({ ...mockFullCharactersResponse.results[1], currentPage: 1 });
  });
});
