import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'badrudev | Software Engineer',
  description: 'Software Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={lexend.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
