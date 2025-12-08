"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading/Loading";

const getNumericPrice = (priceString) => {
  if (typeof priceString === "number") return priceString;
  if (typeof priceString !== "string") return 0;

  const numericPart = priceString.replace(/[^0-9.]/g, "");
  return parseFloat(numericPart) || 0;
};

export default function page() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [kitItems, setKitItems] = useState([]);
  const [loadingKits, setLoadingKits] = useState(true);
  const [sortOrder, setSortOrder] = useState("none");

  // --- 1. Authentication Guard ---
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      try {
        const myKits = JSON.parse(localStorage.getItem("myKits")) || [];
        setKitItems(myKits);
      } catch (error) {
        toast.error("Error loading kits from localStorage:", error);
      } finally {
        setLoadingKits(false);
      }
    }
  }, [isSignedIn]);

  const sortedKitItems = useMemo(() => {
    if (sortOrder === "price-asc") {
      return [...kitItems].sort(
        (p, q) => getNumericPrice(p.price) - getNumericPrice(q.price)
      );
    } else if (sortOrder === "price-desc") {
      return [...kitItems].sort(
        (p, q) => getNumericPrice(q.price) - getNumericPrice(p.price)
      );
    } else {
      return kitItems;
    }
  }, [kitItems, sortOrder]);

  const handleRemoveKit = (_idToRemove) => {
    try {
      const existingKits = JSON.parse(localStorage.getItem("myKits")) || [];
      const updatedKits = existingKits.filter(
        (item) => item._id !== _idToRemove
      );

      localStorage.setItem("myKits", JSON.stringify(updatedKits));

      setKitItems(updatedKits);

      toast.success("Kit has been removed successfully");
    } catch (error) {
      toast.error("Failed to remove kit");
    }
  };

  if (!isLoaded || !isSignedIn || loadingKits) {
    return (
      <div className="flex justify-center items-center h-screen">
        {!isLoaded || !isSignedIn ? (
          <Loading></Loading>
        ) : (
          "**Loading your kits...**"
        )}
      </div>
    );
  }

  if (kitItems.length === 0) {
    return (
      <div className="text-center p-20 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          {" "}
          Your Kit Cart is Empty
        </h1>
        <p className="text-xl text-gray-600">
          Looks like you haven't added any kits yet.
        </p>
        <Link
          href="/all-kits"
          className="btn rounded-xl text-white  bg-secondary w-50"
        >
          Browse Kits
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-10">
      <h1 className="text-4xl font-extrabold mb-5 text-center text-gray-900">
        Your Cart List
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Manage your selected kits below.
      </p>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center max-w-4xl mx-auto w-full mb-8">
        <div className="font-bold text-2xl pb-4 lg:pb-0 text-gray-700">
          ({kitItems.length}) Kits Found
        </div>

        <label className="form-control w-full max-w-xs">
          <select
            className="select select-bordered border-gray-300 bg-white text-gray-800 rounded-lg shadow-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Default</option>
            <option value="price-asc">Price: Low -&gt; High</option>
            <option value="price-desc">Price: High -&gt; Low</option>
          </select>
        </label>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto w-full">
        {sortedKitItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between transition-shadow duration-300 hover:shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4 w-full md:w-3/5">
              <div className="w-24 h-24 flex-shrink-0 relative">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Category: {item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-8 mt-4 md:mt-0 w-full md:w-2/5 justify-end">
              <p className="text-2xl font-extrabold text-[#632EE3] text-right flex-shrink-0">
                {item.price} TK
              </p>

              <button
                onClick={() => handleRemoveKit(item._id)}
                className="btn px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md transition duration-200 ease-in-out hover:bg-red-700 active:bg-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster></Toaster>
    </div>
  );
}
