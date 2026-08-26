"use client";

import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-dark-500/50 bg-dark-800/30 py-3 md:py-4 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-gray-500">
          <Rocket className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
          <span>Elouize Boost Pro</span>
          <span className="text-gray-600">|</span>
          <span>v1.0.0</span>
        </div>
        <div className="text-[10px] md:text-xs text-gray-600">
          &copy; {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
