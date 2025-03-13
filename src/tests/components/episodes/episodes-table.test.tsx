import EpisodesTable from '@/components/episodes/episodes-table';
import { mockEpisodes } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('EpisodesTable', () => {
  it('render a character table with only episodes', () => {
    render(
      <EpisodesTable
        episodes={mockEpisodes}
        tableTitle='Rick Sanchez - Only Episodes'
      />
    );

    const episodeRow1 = screen.getByTestId('episode-row-1');
    const episodeRow2 = screen.getByTestId('episode-row-2');

    expect(episodeRow1).toBeInTheDocument();
    expect(episodeRow2).toBeInTheDocument();
  });

  it('search for a specific episode', () => {
    render(
      <EpisodesTable
        episodes={mockEpisodes}
        tableTitle='Rick Sanchez - Only Episodes'
      />
    );

    const searchInput = screen.getByTestId('search-episodes');

    fireEvent.change(searchInput, { target: { value: 'Pilot' } });

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.queryByText('Lawnmower Dog')).not.toBeInTheDocument();
  });
});
