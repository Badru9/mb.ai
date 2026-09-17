"use client";

import { ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import NavbarComponent from "./components/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <NavbarComponent />
      {children}
      <ToastProvider placement="bottom" />
    </ThemeProvider>
  );
}
