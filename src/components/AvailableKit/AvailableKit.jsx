"use client";
import React, { use } from 'react';
import Card from '../Card/Card';


export default function AvailableKit({ promise }) {

    if (!promise) {
        return <div className="text-error">No promise provided</div>;
    }

    const availableKits = use(promise);

    if (!Array.isArray(availableKits)) {
        return <div className="text-center p-4 text-error">Error: Invalid data format.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto p-4">
            {availableKits.map((kit) => (
                <Card key={kit._id} kit={kit} />
            ))}
        </div>
    );
}