import './globals.css';
import type { Metadata } from 'next';
import { Inter, Creepster, Mountains_of_Christmas } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en">
      <body className="bg-black min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark', 'matrix', 'spring', 'summer', 'autumn', 'winter', 'halloween', 'christmas']}
          forcedTheme={undefined}
          disableTransitionOnChange
        >
          {children}
          {/* <WeatherDrawer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}