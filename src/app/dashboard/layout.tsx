"use client";

import { useState, createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <div className="flex min-h-screen bg-dark-900">
          <Sidebar />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
            <Header />
            <main className="flex-1 p-4 md:p-6">{children}</main>
            <Footer />
          </div>
        </div>
      </LayoutContext.Provider>
    </SessionProvider>
  );
}
