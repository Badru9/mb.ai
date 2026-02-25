'use client';

import { HeroUIProvider } from '@heroui/react';
import NavbarComponent from './components/Navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NavbarComponent />
      {children}
    </HeroUIProvider>
  );
}
