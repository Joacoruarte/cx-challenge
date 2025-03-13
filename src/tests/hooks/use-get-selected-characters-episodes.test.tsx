import { useGetSelectedCharactersEpisodes } from '@/hooks/characters/use-get-selected-characters-episodes';
import { getEpisode } from '@/services/get-episode';
import { waitFor } from '@testing-library/dom';
import {
    mockEpisodes,
    mockFullCharactersResponse,
    renderHookWithProviders,
    setupMockCharacterStore,
} from '../test-utils';

jest.mock('@/stores/characters.store', () => ({
  useCharacterStore: jest.fn(),
}));

jest.mock('@/services/get-episode', () => ({
  getEpisode: jest.fn(),
}));

describe('useGetSelectedCharactersEpisodes', () => {
  let mockSetCharacter1: jest.Func;
  let mockSetCharacter2: jest.Func;

  beforeEach(() => {
    // Configura el estado mock antes de cada test
    jest.clearAllMocks();
    const characterStoreConfig = setupMockCharacterStore()
    mockSetCharacter1 = characterStoreConfig.mockSetCharacter1;
    mockSetCharacter2 = characterStoreConfig.mockSetCharacter2;
  });

  it('should return the initial values for data, error and loading', () => {
    // Paso 1: Renderizar el hook
    const { result } = renderHookWithProviders(() =>
      useGetSelectedCharactersEpisodes()
    );

    // Paso 2: Verificar que los valores iniciales son correctos
    const {
      hasCharacter1,
      hasCharacter2,
      character1Episodes,
      character2Episodes,
      hasBothCharacters,
      sharedEpisodes,
    } = result.current as unknown as ReturnType<
      typeof useGetSelectedCharactersEpisodes
    >;

    expect(hasCharacter1).toBe(false);
    expect(hasCharacter2).toBe(false);
    expect(hasBothCharacters).toBe(false);
    expect(character1Episodes).toEqual([]);
    expect(character2Episodes).toEqual([]);
    expect(sharedEpisodes).toEqual([]);
  });

  it('should return the episodes for the characters', async () => {
    // Paso 1: Configurar el mock para devolver los datos de prueba
    mockSetCharacter1(mockFullCharactersResponse.results[0]);
    mockSetCharacter2(mockFullCharactersResponse.results[1]);

    // Paso 2: Precargar los episodios de los personajes
    (getEpisode as unknown as jest.Mock).mockResolvedValueOnce(mockEpisodes[0]);
    (getEpisode as unknown as jest.Mock).mockResolvedValueOnce(mockEpisodes[1]);
    (getEpisode as unknown as jest.Mock).mockResolvedValueOnce(mockEpisodes[2]);

    // Paso 3: Renderizar el hook
    const { result } = renderHookWithProviders(() =>
      useGetSelectedCharactersEpisodes()
    );

    // Paso 4: Esperar a que los episodios se carguen
    await waitFor(() => result.current.character1Episodes.length > 0);
    await waitFor(() => result.current.character2Episodes.length > 0);


    // Paso 5: Verificar que los episodios se cargaron correctamente
    expect(result.current.character1Episodes).toEqual([mockEpisodes[0], mockEpisodes[1]]);
    expect(result.current.character2Episodes).toEqual([mockEpisodes[0], mockEpisodes[2]]);
    expect(result.current.sharedEpisodes).toEqual([mockEpisodes[0]]);
  });
});
