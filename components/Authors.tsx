import React from "react";
import { authorsList } from "@/libs/authorsList";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

function Authors() {
  return (
    <section className=" mt-20 w-10/12 mx-auto flex flex-col gap-10">
      <div className=" text-center">
        <h2>List of Authors</h2>
      </div>
      <div className=" flex gap-14 mx-auto w-10/12">
        {authorsList.map((author) => (
          <div
            key={author.id}
            className=" flex flex-col gap-2 mx-auto justify-center items-center bg-lightgrey hover:bg-lightyellow px-8 py-10 w-[35%] text-center"
          >
            <div className=" mb-4 h-[100px]">
              <Image
                src={author.image}
                alt="author image"
                width={100}
                height={100}
                className=" rounded-[50%] h-[100px]"
              />
            </div>

            <h3 className=" text-darkgrey text-2xl">{author.name}</h3>
            <p className=" text-sm text-midgrey">{author.role} at CWK</p>
            <div className=" flex gap-4">
              <a key={author.socials[0].name} href={author.socials[0].link}>
                <FaFacebook />
              </a>
              <a key={author.socials[1].name} href={author.socials[1].link}>
                <FaTwitter />
              </a>
              <a key={author.socials[2].name} href={author.socials[2].link}>
                <FaLinkedin />
              </a>
              <a key={author.socials[3].name} href={author.socials[3].link}>
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Authors;
