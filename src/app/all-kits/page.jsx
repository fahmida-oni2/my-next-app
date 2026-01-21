import KitSearching from '@/components/KitSearching/KitSearching';
import { getDb } from "@/lib/db";
import React from 'react';


export const revalidate = 1;

export default async function page() {
  try {
 
    const db = await getDb();
    const result = await db.collection("kit-collection").find().toArray();


    const kits = JSON.parse(JSON.stringify(result));

    return (
      <div className='flex flex-col min-h-screen bg-base-100'>
        <div className='pt-10'>
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeInDown text-center text-base-content">
            All Kits
          </h1>
          <p className="text-center mb-12 animate__animated animate__fadeInUp text-base-content opacity-70">
            Explore All Kits.
          </p>
        </div>

        <div className='mb-5'>
          <KitSearching initialKits={kits} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Build error fetching kits:", error);
  
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Unable to load kits</h1>
        <p>Please check your database connection.</p>
      </div>
    );
  }
}