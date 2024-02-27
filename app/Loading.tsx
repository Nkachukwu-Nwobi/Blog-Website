import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-red-500 flex justify-center items-center text-black text-sm">loading</div>
    </div>
  );  
}

export default Loading;
