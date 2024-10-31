import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Cursor } from '@/components/cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Windows 11 Portfolio',
  description: 'A Windows 11-style portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Cursor />
        </ThemeProvider>
      </body>
    </html>
  );
}