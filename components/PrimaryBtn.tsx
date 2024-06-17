import React from 'react'

function PrimaryBtn({ text}: {text: string}) {
  return (
    <button className=" hover:bg-yellow/80 bg-yellow px-8 py-2 text-center text-base text-black font-bold z-50">
        {text}
    </button>
  )
}

export default PrimaryBtn