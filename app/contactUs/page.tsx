import React from "react";
import PrimaryBtn from "@/components/PrimaryBtn";

function page() {
  return (
    <main>
      <section className=" w-5/12 mx-auto flex flex-col gap-4 text-center mt-20 ">
        <h4>CONTACT US</h4>
        <h2>Let’s Start a Conversation</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
      </section>

      {/* working hours */}

      <section className=" mt-14 w-5/12 mx-auto flex justify-between items-center bg-purple px-16 py-10 text-white">
        <div className=" flex flex-col gap-4">
          <h5>Working hours</h5>
          <h3>
            Monday To Friday <br /> 9:00 AM to 8:00 PM{" "}
          </h3>
          <h5>Our Support Team is available 24/7</h5>
        </div>

        <div className=" flex flex-col gap-4">
          <h5>Contact us</h5>
          <h3>020 7993 2905</h3>
          <h5>hello@finsweet.com</h5>
        </div>
      </section>

      {/* contact form */}

      <section className=" w-5/12 mx-auto mt-14">
        <form className=" flex flex-col gap-4" action="">
          <input
            type="text"
            placeholder="Full Name"
            className=" border-2 border-lightgrey p-4"
          />
          <input
            type="text"
            placeholder="Your Email"
            className=" border-2 border-lightgrey p-4"
          />
          <select
            name=""
            id=""
            className=" border-2 border-lightgrey px-4 py-4"
          >
            <option value=""></option>
            <option value="">Query Related</option>
          </select>
          <textarea
            name=""
            id=""
            cols={30}
            rows={5}
            className=" border-2 border-lightgrey p-4 resize-none"
            placeholder="Message"
          ></textarea>
          <div className=" w-full">
            <button className=" bg-yellow text-black px-4 py-4 w-full">
              Send Message
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default page;
