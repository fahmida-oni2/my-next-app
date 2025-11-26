import React from 'react'
import Card from '../Card/Card';

export default async function AvailableKit({ availableKitPromise })
{
    const availableKits = await availableKitPromise;
    if (!Array.isArray(availableKits)) {
        return <div className="text-center p-4 text-red-500">Error: Could not load kit data.</div>;
    }
  return (
   <div className="grid grid-cols-1  lg:grid-cols-3  gap-6 container mx-auto p-4">
      {availableKits.map((kit) => (
        <Card key={kit._id} kit={kit} />
      ))}
    </div>
  )
}
