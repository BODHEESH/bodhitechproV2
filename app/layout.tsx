import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BodhiTech Pro Interview Management',
  description: 'A comprehensive interview preparation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
