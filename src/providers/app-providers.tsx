'use client';
import { getQueryClient } from '@/lib/get-query-client';
import { Theme } from '@/lib/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
  defaultTheme: Theme;
}

export default function Providers({ children, defaultTheme }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
