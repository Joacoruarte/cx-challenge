import { getQueryClient } from '@/lib/get-query-client';
import CharacterComparison from './page.client';
import { getCharacters } from '@/services/get-characters';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/loading-skeleton';

export default async function CharacterComparisonPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = ((await searchParams).page || '1') as string;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingSkeleton />}>
        <CharacterComparison defaultPage={page} />
      </Suspense>
    </HydrationBoundary>
  );
}
