// filteredPosts.tsx
"use client"

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";

const SearchResults = dynamic(() => import('@/components/SearchResults'), { ssr: false });

export default function FilteredPosts() {
  

  return (
    <div>
        <Link
            className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900 mb-10"
            href={"/"}
          >
            Back to home
          </Link>
          <div>
          <SearchResults />
          </div>
      
    </div>
  );
}
