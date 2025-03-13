import { CharacterCardList } from '@/components/characters/character-card-list';
import { Character } from '@/models/character';
import { mockFullCharactersResponse } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('CharactersCardList', () => {
  const mockCharacters: Character[] = mockFullCharactersResponse.results;

  it('renders two characters in a list', () => {
    render(<CharacterCardList characters={mockCharacters} />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });

  it('renders a skeleton loading card if loading state is true', () => {
    render(<CharacterCardList characters={[]} loading={true} />);

    expect(screen.getByTestId('character-card-skeleton-1')).toBeInTheDocument();
  })
});
