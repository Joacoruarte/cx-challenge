import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CharacterCard } from '@/components/characters/character-card';
import { Character } from '@/models/character';
import { CharacterStore, useCharacterStore } from '@/stores/characters.store';
import {
  mockFullCharactersResponse,
  setupMockCharacterStore,
} from '@/tests/test-utils';

jest.mock('@/stores/characters.store', () => ({
  useCharacterStore: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockCharacter: Character = mockFullCharactersResponse.results[0];
  let mockSetCharacter1: jest.Func;
  let mockStore: CharacterStore;

  beforeEach(() => {
    // Configura el estado mock antes de cada test
    jest.clearAllMocks();
    const characterStoreConfig = setupMockCharacterStore();
    mockSetCharacter1 = characterStoreConfig.mockSetCharacter1;
    mockStore = characterStoreConfig.mockStore;
  });

  it('Displays the checked icon only after clicking on the card', () => {
    // Paso 1: Renderizar el componente con el personaje no seleccionado
    const { rerender } = render(
      <CharacterCard character={mockCharacter} currentPage={1} />
    );

    // Obtener el contenedor del indicador de selección
    const checkContainer =
      screen.getByTestId('selection-indicator') ||
      document.querySelector('div[data-testid="selection-indicator"]');

    // Verificar que inicialmente el contenedor tiene la clase scale-0 (no visible)
    expect(checkContainer).toHaveClass('scale-0');
    expect(checkContainer).not.toHaveClass('scale-100');

    // Paso 2: Simular clic en la tarjeta
    const card = screen.getByText('Rick Sanchez').closest('.cursor-pointer');
    fireEvent.click(card as Element);

    // Verificar que se llamó a setCharacter1
    expect(mockSetCharacter1).toHaveBeenCalledWith({
      ...mockCharacter,
      currentPage: 1,
    });

    // Paso 3: Actualizar el mock para simular que ahora el personaje está seleccionado
    (useCharacterStore as unknown as jest.Mock).mockImplementation(
      () => mockStore
    );

    // Volver a renderizar el componente con el nuevo estado
    rerender(<CharacterCard character={mockCharacter} currentPage={1} />);

    // Obtener nuevamente el contenedor del indicador después de la re-renderización
    const updatedCheckContainer =
      screen.getByTestId('selection-indicator') ||
      document.querySelector('div[data-testid="selection-indicator"]');

    // Verificar que ahora tiene la clase scale-100 (visible)
    expect(updatedCheckContainer).toHaveClass('scale-100');
    expect(updatedCheckContainer).not.toHaveClass('scale-0');
  });
});
