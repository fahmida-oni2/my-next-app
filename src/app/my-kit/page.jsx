"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
    const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login"); 
    }
  }, [isLoaded, isSignedIn, router]);
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user session...</p>
      </div>
    );
  }
  return (
    <div>
      My kit
    </div>
  )
}
