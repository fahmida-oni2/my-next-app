"use client";
import AvailableKit from "@/components/AvailableKit/AvailableKit";
import Banner from "@/components/Banner/Banner";
import Loading from "@/components/Loading/Loading";
import "animate.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';


const latestKitsPromise = fetch(`${BASE_URL}/api/latest-kits`, {
  cache: 'no-store' 
}).then(res => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export default function Home() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Banner />

   
      <section className="py-20 bg-base-200 text-center px-4">
        <h2 className="text-4xl text-base-content font-bold mb-4 animate__animated animate__fadeInDown">
          Our Newest Arrivals
        </h2>
        <p className="text-base-content opacity-70 mb-12 animate__animated animate__fadeInUp max-w-2xl mx-auto">
          Freshly curated sustainable kits for your next project. Explore our most recently added eco-friendly crafting experiences.
        </p>

        <Suspense 
          fallback={
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loading />
              <p className="text-primary animate-pulse font-medium">Unweaving the latest kits...</p>
            </div>
          }
        >
      
          <AvailableKit promise={latestKitsPromise} />
        </Suspense>
        
        <div className="mt-12">
          <Link href="/all-kits" className="btn btn-outline btn-secondary px-10 rounded-full hover:scale-105 transition-all">
            Explore All Kits
          </Link>
        </div>
      </section>

 
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-base-content mb-16">How TerraLoom Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Choose Your Kit", desc: "Select from our curated list of eco-friendly, educator-designed projects." },
              { step: "02", title: "Create & Learn", desc: "Follow our interactive guides to build something amazing while learning STEM skills." },
              { step: "03", title: "Share & Sustain", desc: "Show off your creation and recycle the packaging—we plant a tree for every kit." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-3">{item.title}</h3>
                <p className="text-base-content opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Our Growing Community</h2>
            <p className="opacity-70 max-w-2xl mx-auto">
              Thousands of creators weaving a sustainable future together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="stats shadow bg-base-100 border border-base-300">
              <div className="stat text-center">
                <div className="stat-title text-secondary font-semibold">Trees Planted</div>
                <div className="stat-value text-primary">12.5k</div>
                <div className="stat-desc">Kit-funded reforestation</div>
              </div>
            </div>
            <div className="stats shadow bg-base-100 border border-base-300">
              <div className="stat text-center">
                <div className="stat-title text-secondary font-semibold">Plastic Diverted</div>
                <div className="stat-value text-primary">2,400kg</div>
                <div className="stat-desc">Zero-waste packaging</div>
              </div>
            </div>
            <div className="stats shadow bg-base-100 border border-base-300">
              <div className="stat text-center">
                <div className="stat-title text-secondary font-semibold">Active Creators</div>
                <div className="stat-value text-primary">8,200+</div>
                <div className="stat-desc">In 15 different countries</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { quote: "The solar oven kit didn't just teach my daughter about energy; it showed her she could build things that work.", author: "Sarah M.", role: "Parent" },
              { quote: "As an educator, I appreciate how every component is biodegradable. It's the first STEM kit that practices what it preaches.", author: "Prof. Aris", role: "Science Teacher" },
              { quote: "Finally, a craft kit that doesn't leave me with a pile of plastic trash. The wooden looms are built to last.", author: "Jamie L.", role: "Art Enthusiast" }
            ].map((item, i) => (
              <div key={i} className="bg-base-100 p-8 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary text-4xl mb-4 font-serif">“</div>
                <p className="text-lg italic text-base-content opacity-80 mb-6 -mt-4 leading-relaxed">{item.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span className="text-xs">{item.author[0]}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-base-content">{item.author}</p>
                    <p className="text-xs opacity-50 uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start weaving your story?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Join eco-conscious creators and get weekly project ideas delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs text-base-content" />
            <button className="btn btn-secondary px-8">Join the Loom</button>
          </div>
        </div>
      </section>


      <section className="py-20 bg-base-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">Partner With Us</h2>
          </div>
          <div className="card bg-base-200 shadow-2xl border border-base-300 max-w-xl mx-auto">
            <form className="card-body p-8 sm:p-12 gap-2">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Full Name</span></label>
                <input type="text"  className="input input-bordered w-full focus:input-primary" required />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Email Address</span></label>
                <input type="email" className="input input-bordered w-full focus:input-primary" required />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Message</span></label>
                <textarea className="textarea textarea-bordered h-32 focus:textarea-primary" required></textarea>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-secondary text-white font-bold text-lg">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}