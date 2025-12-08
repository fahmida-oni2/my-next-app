import AvailableKit from "@/components/AvailableKit/AvailableKit";
import Banner from "@/components/Banner/Banner";
import Loading from "@/components/Loading/Loading";
import "animate.css";
import Image from "next/image";
import { Suspense } from "react";
const availableKitPromise = fetch('https://terraloom-kit-api-server.vercel.app/available-kits').then(res => res.json());
export default function Home() {
  return (
   <div>
    <Banner></Banner>
    <section className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-4xl text-black font-bold mb-4 animate__animated animate__fadeInDown">
         Our Most Popular Kits
        </h2>
        <p className="text-gray-600 mb-12 animate__animated animate__fadeInUp">
          Effortlessly find, compare, and secure our  kits.
        </p>

        <Suspense
          fallback={
            <div className="text-center p-20 text-lg font-semibold text-indigo-500 animate-pulse">
              <Loading></Loading>
            </div>
          }
        >

          <AvailableKit availableKitPromise={availableKitPromise} />
        </Suspense>
      </section>

      <section className="py-16 bg-white text-center px-4">
        <h2 className="text-4xl text-black font-bold mb-4 animate__animated animate__fadeInDown">
          Our Commitment
        </h2>
        <p className="text-gray-600 mb-12 animate__animated animate__fadeInUp max-w-3xl mx-auto">
          We believe creativity shouldn't come at the expense of the planet, ensuring every TerraLoom kit supports your learning journey and a sustainable Earth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
        
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInLeft">
            <Image src="https://i.ibb.co.com/BK7HC85G/image.png" alt="Eco Materials" width={300} height={80} className=" mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Sustainably Sourced Materials</h3>
            <p className="text-gray-500 text-center">
              We use FSC-certified wood, recycled plastics, and biodegradable components to minimize our ecological footprint.
            </p>
          </div>
          
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInUp">
            <Image src="https://i.ibb.co.com/SDz2SrBF/image.png" alt="Zero Waste Packaging" width={300} height={80} className=" mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Zero-Waste Packaging</h3>
            <p className="text-gray-500 text-center">
              Our packaging is 100% recycled, recyclable, and designed to eliminate single-use plastics entirely.
            </p>
          </div>
          

          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInRight">
            <Image src="https://i.ibb.co.com/cp47sqT/image.png" alt="Hands-on Learning" width={300} height={80} className=" mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Hands-On, Real-World Skills</h3>
            <p className="text-gray-500 text-center">
              Each kit is crafted by educators to foster critical thinking, engineering, and problem-solving skills.
            </p>
          </div>
          
        
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInLeft">
            <Image src="https://i.ibb.co.com/Y7vHMtCD/image.png" alt="Community Support" width={300} height={80} className=" mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Climate Positive Shipping</h3>
            <p className="text-gray-500 text-center">
              We partner with reforestation projects to offset 100% of the carbon emissions generated during product shipping.
            </p>
          </div>
          
      
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInUp">
            <Image src="https://i.ibb.co.com/d0DYTbCJ/image.png" alt="Quality" width={300} height={80} className=" mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Quality & Durability</h3>
            <p className="text-gray-500 text-center">
              Kits are built to last, providing enduring educational value that can be passed down to others.
            </p>
          </div>
          
          
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInRight">
            <Image src="https://i.ibb.co.com/93bWySLf/image.png" alt="Customer Reviews" width={300} height={80} className="mb-4"/>
            <h3 className="text-xl text-black font-semibold mb-2">Highly Recommended</h3>
            <p className="text-gray-500 text-center">
              Rated 4.9/5 by our community of satisfied parents, teachers, and makers.
            </p>
          </div>
        </div>
      </section>
      <section className=" py-16 bg-gray-50">
        <form className=" ">
          <div className="bg-base-200 max-w-6xl mx-auto  px-4 ">
            <div className="hero-content flex flex-col ">
              <div>
                <h1 className="text-4xl text-center font-bold mb-4 animate__animated animate__fadeInDown">
                  For partnership Contact With Us
                </h1>
              </div>
              <div className=" bg-gray-500 w-full max-w-sm shrink-0 shadow-2xl items-center">
                <div className="card-body pr-5 mr-5 ">
                  <fieldset className="fieldset ">
                    <label className="label font-bold text-black ">Name</label>
                    <input
                      type="Name"
                      className="input "
                      placeholder="Name"
                      required
                    />
                    <label className="label font-bold text-black">Email</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      required
                    />
                    <label className="label font-bold text-black">
                      Mobile No
                    </label>
                    <input
                      type="Mobile"
                      className="input"
                      placeholder="Mobile No"
                      required
                    />
                    <label className="label font-bold text-black">
                      Message
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Message"
                    />
                    <button className="btn  bg-secondary w-80 hover:bg-indigo-300 mt-4">
                      Submit
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
   </div>
  );
}
