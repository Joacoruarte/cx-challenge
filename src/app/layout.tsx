import { Theme } from '@/lib/theme';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import Providers from './providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Rick and Morty APP',
  description: 'Rick and Morty APP',
  icons: [
    {
      rel: 'icon',
      url: '/rick-and-morty.png',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const defaultTheme = (cookiesStore.get('theme')?.value || 'light') as Theme;

  return (
    <html lang='en' className={defaultTheme}>
      <body className={'antialiased'}>
        <Toaster position='top-right' />
        <Providers defaultTheme={defaultTheme}>{children}</Providers>
      </body>
    </html>
  );
}
