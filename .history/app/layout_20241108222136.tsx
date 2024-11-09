import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
// import { WeatherDrawer } from '@/components/WeatherDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Antoine Gaton\'s Portfolio',
  description: 'A Windows 11-style portfolio website created by Software Engineer Antoine Gaton using Next.js, Shadcn, Tailwind CSS, and TypeScript.',
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
          {/* <WeatherDrawer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}