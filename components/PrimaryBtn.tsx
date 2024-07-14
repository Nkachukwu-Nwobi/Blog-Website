import React from "react";
import Link from "next/link";

function PrimaryBtn({ text, link }: { text: string; link: string }) {
  return (
    <Link href={link}>
      <button className=" hover:bg-yellow/80 bg-yellow px-8 py-2 text-center text-lg text-black font-bold z-50">
        {text}
      </button>
    </Link>
  );
}

export default PrimaryBtn;
