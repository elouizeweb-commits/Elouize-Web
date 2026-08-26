"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LayoutContext } from "@/app/dashboard/layout";
import { useContext } from "react";

const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/campaigns": "Campagnes",
  "/dashboard/platforms": "Plateformes",
  "/dashboard/analytics": "Analytics",
  "/dashboard/automation": "Automatisation",
  "/dashboard/settings": "Paramètres",
};

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { setSidebarOpen } = useContext(LayoutContext);

  const pageTitle = routeNames[pathname || ""] || "Dashboard";

  return (
    <header className="h-14 md:h-16 border-b border-dark-500/50 bg-dark-800/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-dark-600/50 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base md:text-lg font-semibold text-gray-100">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-48 md:w-64 bg-dark-600/50 border border-dark-500/50 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>

        <button className="relative p-2 rounded-xl hover:bg-dark-600/50 text-gray-400 hover:text-gray-200 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
