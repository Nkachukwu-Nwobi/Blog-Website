import React from 'react'
import PrimaryBtn from './PrimaryBtn'

function JoinUs() {
  return (
    <section className=" mt-20 ">
            <div className=" w-[25%] mx-auto text-center flex flex-col justify-center gap-4">
              <h2>Join our team to be a part of our story</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <div className=" w-[60%] mx-auto">
                <PrimaryBtn text="Join now" />
              </div>
            </div>
          </section>
  )
}

export default JoinUs