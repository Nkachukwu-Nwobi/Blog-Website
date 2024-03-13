"use client"
import React from "react";
import backgroundImage from "@/public/background-image.jpeg";

function Page() {
  return (
    <div
      className="bg-cover bg-center bg-local bg-no-repeat h-screen w-full relative flex justify-end pr-20"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      <div className="max-w-2xl text-white font-black flex flex-col gap-6 items-end bg-none h-2/6 py-10 mt-40 z-50">
        <div className="w-full text-right text-6xl">
          <h1>
            Take your <span className="text-blue-900">coding</span> to the next level
          </h1>
        </div>

        <div className="w-7/12 text-xl text-right text-white ">
          Subscribe to get the latest articles and information
        </div>

        <div className="w-7/12 text-right ">
          <form className="flex justify-end z-50 gap-4">
            
            <input
              className="bg-white rounded-2xl px-6 py-3 text-xl z-50 text-blue-900 hover:ring-2 hover:ring-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 placeholder:text-blue-900/50"

              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
             
            />
            <button className="hover:bg-blue-900/80 rounded-2xl bg-blue-900 px-10 py-1 text-center text-2xl text-white z-50">
              subscribe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Page;
