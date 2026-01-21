"use client";
import React from 'react';
import Card from '../Card/Card';


export default function AvailableKit({ kits }) {


    if (!kits) {
        return <div className="text-error py-10">No kits available at the moment.</div>;
    }


    if (!Array.isArray(kits)) {
        return <div className="text-center p-4 text-error">Error: Invalid data format.</div>;
    }

    if (kits.length === 0) {
        return <div className="text-center py-10 opacity-50">No new arrivals found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto p-4">
            {kits.map((kit) => (
                <Card key={kit._id} kit={kit} />
            ))}
        </div>
    );
}