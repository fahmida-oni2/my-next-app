import Image from "next/image";
import React from "react";
import "animate.css";
export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl mt-5 text-center  font-bold mb-4 animate__animated animate__fadeInDown">
        About Us
      </h2>
      <p className=" mb-12 text-center animate__animated animate__fadeInUp max-w-3xl mx-auto">
        TerraLoom is a platform where users can discover, purchase, and share
        curated DIY kits focused on sustainable crafting, traditional arts, and
        natural home goods.
      </p>

      {/* About */}
      <div className="flex flex-col lg:flex-row items-center bg-gray-50 p-6 mb-3 ml-3 mr-3 rounded-xl   animate__animated animate__fadeInLeft">
        <div className="mr-10 mt-5">
          <Image
            src="https://i.ibb.co.com/BK7HC85G/image.png"
            alt=""
            width={500}
            height={200}
            className=" mb-4"
          />
        </div>
        <div className="space-y-3 mt-3">
          <h1 className="font-bold text-4xl text-black">
            Unearthing Traditional Arts, Crafting Sustainable Futures
          </h1>
          <h3 className="font-semibold text-2xl text-gray-600">
            Curating heritage, driving mindfulness, <br /> and honoring the
            craftspeople behind every skill.
          </h3>
          <p className="italic text-black">
            From global workshops to your crafting table, <br /> TerraLoom is at
            the forefront of the slow-craft movement. We aren't just a kit
            service , <br />
            we're a legacy rooted in ethical sourcing and artisan partnerships,{" "}
            <br /> bringing you the highest quality, most sustainable DIY
            experiences.
          </p>
        </div>

        {/* Who we are */}
      </div>
      <div className="  flex-col lg:flex-row items-center bg-gray-50 p-6 ml-3 mr-3 rounded-xl   animate__animated animate__fadeInRight">
        <div className="space-y-3">
          <h1 className="text-4xl mt-5 text-center text-black font-bold mb-4 animate__animated animate__fadeInDown">
            WHO WE ARE
          </h1>
          <h3 className="text-gray-600 mb-12 text-center animate__animated animate__fadeInUp max-w-3xl mx-auto">
            A Handcraft & Sustainable DIY Kits from 1992
          </h3>
        </div>
        <div className="space-y-3 mt-3 flex flex-col lg:flex-row justify-between items-center">
          <p className="italic text-black">
            TerraLoom is a premium platform and community hub <br /> dedicated
            to sustainable DIY crafting. We meticulously curate kits <br />{" "}
            focused on traditional arts and natural home goods,
            <br /> always prioritizing eco-conscious materials and zero-waste
            packaging. <br /> We empower makers by providing high-quality tools
            and instruction while fostering transparent, ethical partnerships
            with artisans. <br /> Our mission is to merge conscious creation
            with genuine skill mastery in a supportive online community.
          </p>
          <div className="ml-5 mt-5">
            <Image
              src="https://i.ibb.co.com/TMbh14Fq/image.png"
              alt=""
              width={500}
              height={80}
              className=" mb-4"
            />
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="flex flex-col-reverse lg:flex-row bg-gray-50  items-center ml-3 mr-3 mt-3 rounded-2xl">
        <Image
          src="https://i.ibb.co.com/3yHwsgMK/image.png"
          alt=""
          width={500}
          height={80}
          className="mt-3 mr-10 mb-4 ml-10 lg:ml-0"
        />
        <div>
          <h1 className="text-4xl mt-5 text-black  font-bold mb-4 animate__animated animate__fadeInDown">
            Crafting the Next Chapter, Together
          </h1>
          <p className=" italic text-black">
            To be the global community hub <br /> shaping the future of
            sustainable craft and traditional arts. <br /> We ignite creative
            potential by curating high-quality,
            <br /> responsible DIY experiences. Partner with us as we shape this
            next era, one shared skill at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
