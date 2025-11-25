'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "animate.css";
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
              backgroundImage:
                "url(https://i.ibb.co.com/LG30919/pexels-energepic-com-27411-313691.jpg)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className=" hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4 ">
              <div className="max-w-md  ">
                <h1 className="mb-5 text-5xl font-bold animate__animated animate__backInUp">
                 TerraLoom 
                </h1>
                <p className=" text-2xl lg:text-3xl font-bold animate__animated animate__swing">
                    Handcraft & Sustainable DIY Kits
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/QF9JVZ7T/pexels-jessica-bryant-592135-1370704.jpg)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  Discover, purchase, and share curated DIY kits
                </h2>
                <p className="text-2xl lg:text-3xl">
               We combine premium craft boxes with a creative community hub, perfectly aligned with our ‘Kits’ feature.
                </p>
                     <button className=" btn btn-primary w-30 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] ">
                     Sign Out
                    </button>
              </div>
            </div>
          </div>
        
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero min-h-screen "
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/99pRvbfJ/pexels-falling4utah-2724748.jpg)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content flex flex-col lg:flex-row justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  Search. Compare. Secure Your Next Space
                </h2>
                <p className="text-2xl lg:text-3xl">
                 Discover a seamless way to explore verified listings tailored to your needs. <br />
                  Make confident property decisions with a platform built for clarity, speed, and trust.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
          
      </Swiper>
    
    </div>
  )
}
