// components/Board/SearchBar.tsx
"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { Search } from "lucide-react";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <div className="relative w-full md:w-96">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
