// components/Layout/Topbar.tsx
"use client";

import { Bell } from "lucide-react";
import SearchBar from "@/components/Board/SearchBar";

const Topbar = () => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-white border-b">
      <SearchBar />
      <div className="flex items-center space-x-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-white text-sm flex items-center justify-center font-semibold">
          👤
        </div>
      </div>
    </header>
  );
};

export default Topbar;
