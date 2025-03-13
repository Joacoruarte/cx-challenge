/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Character } from '@/models/character';
import { Episode } from '@/models/episodes';
import { getEpisode } from '@/services/get-episode';
import { useCharacterStore } from '@/stores/characters.store';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

export const useGetSelectedCharactersEpisodes = () => {
  const { character1, character2 } = useCharacterStore();
  
  const toastShownRef = useRef({
    character1: false,
    character2: false,
  });

  const character1EpisodesQueries = useQueries({
    queries: (character1?.episode || []).map((episodeUrl) => ({
      queryKey: ['episode', episodeUrl],
      queryFn: () => getEpisode(episodeUrl),
      enabled: !!character1,
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 30 * 60 * 1000, // 30 minutos
    })),
  });

  const character2EpisodesQueries = useQueries({
    queries: (character2?.episode || []).map((episodeUrl) => ({
      queryKey: ['episode', episodeUrl],
      queryFn: () => getEpisode(episodeUrl),
      enabled: !!character2,
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 30 * 60 * 1000, // 30 minutos
    })),
  });

  const isChar1Loading =
    character1 && character1EpisodesQueries.some((q) => q.isLoading);
  const isChar2Loading =
    character2 && character2EpisodesQueries.some((q) => q.isLoading);

  const character1Episodes = isChar1Loading
    ? []
    : character1EpisodesQueries.map((query) => query.data as Episode);

  const character2Episodes = isChar2Loading
    ? []
    : character2EpisodesQueries.map((query) => query.data as Episode);

  const sharedEpisodes = useMemo(() => {
    if (!character1Episodes.length || !character2Episodes.length) return [];

    const episodes2Set = new Set(character2Episodes.map((ep) => ep?.id));
    return character1Episodes.filter((ep) => episodes2Set.has(ep?.id));
  }, [character1Episodes, character2Episodes]);

  useEffect(() => {
    if (!character1) {
      toastShownRef.current.character1 = false;
    }
    if (!character2) {
      toastShownRef.current.character2 = false;
    }

    const showToast = (character: Character | null, characterEpisodes: Episode[], characterEpisodesQueries: UseQueryResult<Episode, Error>[], toastKey: 'character1' | 'character2') => {
      if (character && characterEpisodes.length) {
      const isSomeData = characterEpisodes.some((e) => !!e?.id);
      const allQueriesSettled = characterEpisodesQueries.every(
        (q) => q.isSuccess || q.isError
      );

      if (isSomeData && allQueriesSettled && !toastShownRef.current[toastKey]) {
        toast.success(`${character.name}'s episodes loaded`);
        toastShownRef.current[toastKey] = true;
      }
      }
    };

    showToast(character1, character1Episodes, character1EpisodesQueries, 'character1');
    showToast(character2, character2Episodes, character2EpisodesQueries, 'character2');
  }, [character1, character2, character1Episodes, character2Episodes]);

  return {
    hasCharacter1: !!character1, 
    hasCharacter2: !!character2, 
    hasBothCharacters: (!!character1 && !!character2), 
    character1Episodes,
    character2Episodes,
    sharedEpisodes,
  };
};
