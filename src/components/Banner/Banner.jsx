"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "animate.css";
import Link from "next/link";
export default function Banner() {
  return (
    <div className="m-5 mt-1">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/1YZvFkpK/image.png)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className=" hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4 ">
              <div className="max-w-md  ">
                <h1 className="mb-5 text-5xl font-bold animate__animated animate__backInUp">
                  Handcraft Your World: Sustainable DIY Kits by TerraLoom
                </h1>
                <p className=" text-2xl lg:text-3xl font-bold animate__animated animate__swing">
                 Unlock your creative potential with eco-conscious projects that are rewarding to make and gentle on the Earth
                </p>
                            <Link
          href="/all-kits"
          className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50 mt-10"
        >
          Explore
        </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/Kp8L29tX/image.png)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  Discover, purchase, and share curated DIY kits
                </h2>
                <p className="text-2xl lg:text-3xl">
                  We combine premium craft boxes with a creative community hub,
                  perfectly aligned with our ‘Kits’ feature.
                </p>
                <Link
                  href="/all-kits"
                  className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50"
                >
                  Browse
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero min-h-screen "
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/m5jLR4x2/image.png)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  Post and Purchase your DIY kits
                </h2>
                 <Link
                  href="/login"
                  className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50"
                >
                  Purchase
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
