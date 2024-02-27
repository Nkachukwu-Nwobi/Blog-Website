"use client"
import React from "react";
import backgroundImage from "@/public/background-image.jpeg";

function Page() {
  return (
    <div
      className="bg-cover bg-center bg-local bg-no-repeat h-screen w-full relative flex justify-end"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="max-w-6xl py-40 h-screen text-white font-black flex flex-col gap-6 items-end pr-20">
        <div className="w-7/12 text-right text-7xl">
          <h1>
            Take your <span className="text-red-500">coding</span> to the next level
          </h1>
        </div>

        <div className="w-7/12 text-xl text-right text-white">
          Subscribe to get the latest articles and information
        </div>

        <div className="w-7/12 text-right">
          <form className="flex justify-end gap-4 z-50">
            
            <input
              className="bg-white/80 rounded-2xl px-4 py-2 text-xl z-50 text-black"
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
             
            />
            <button className="hover:bg-blue-900/80 rounded-2xl bg-red-500 px-10 py-1 text-center text-2xl text-white z-50">
              subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
