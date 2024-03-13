"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push(`/searchPost?query=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search..."
            className=" searchbar px-4 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 shadow-lg border border-blue-900"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center bg-white text-blue-900 rounded-r-lg border border-blue-900"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
}
