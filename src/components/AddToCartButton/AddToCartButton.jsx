"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({ kitData }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!kitData || !kitData._id) return;
    try {
      const myKits = JSON.parse(localStorage.getItem("myKits")) || [];
      const itemExists = myKits.some((item) => item._id === kitData._id);
      setIsAdded(itemExists);
    } catch (error) {
      toast.error("Error from local storage");
    }
  }, [kitData._id]);

  const handleAddToCart = () => {
    try {
      const currentKits = JSON.parse(localStorage.getItem("myKits")) || [];
      let updatedKits;

      if (isAdded) {
        updatedKits = currentKits.filter((item) => item._id !== kitData._id);
        setIsAdded(false);
        toast.success(`"${kitData.title}" removed from your kit list.`);
      } else {
        const newKit = {
          ...kitData,
          added_at: new Date().toISOString(), 
        };
        updatedKits = [...currentKits, newKit];
        setIsAdded(true);
        toast.success(`"${kitData.title}" added to your kit list!`);
      }
      localStorage.setItem("myKits", JSON.stringify(updatedKits));
    } catch (error) {
      toast.error("Could not add kit to cart. Please try again.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`btn rounded-2xl text-white hover:bg-orange-900 ${
        isAdded ? "bg-gray-500" : "bg-orange-500"
      }`}
      disabled={isAdded}
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
