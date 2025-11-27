"use client";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const useProductData = (kitId) => {
  const [kitData, setKitData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!kitId) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://terraloom-kit-api-server.vercel.app/all-kits/${kitId}`);
        if (!res.ok) throw new Error("Failed to fetch kit data");
        const data = await res.json();
        setKitData(data.result || data || {});
      } catch (error) {
        // console.error("Fetch Error:", error);
        toast.error("Failed to load initial kit data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [kitId]);

  return { kitData, isLoading };
};

export default function page() {
  const router = useRouter();
  const params = useParams();
  const kitId = params.id;

  const { isLoaded: userLoaded, user } = useUser();

  const { kitData: data, isLoading: dataLoading } = useProductData(kitId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentKitId = data?._id || kitId; 

    if (!currentKitId) {
      toast.error("Kit ID is missing for update.");
      return;
    }
    const formData = {
      title: e.target.name.value,
      category: e.target.category.value,
      creator_name: user.fullName || user.username || "Anonymous",
      creator_email: user.primaryEmailAddress?.emailAddress || "N/A",
      stock_status: e.target.stock.value,
      created_date: new Date(),
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
    };
    fetch(`https://terraloom-kit-api-server.vercel.app/all-kits/${currentKitId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Kit has been updated successfully");
        e.target.reset();
        router.push(`/all-kits/${currentKitId}`);
      })
      .catch((err) => {
        toast.error("Error");
      });
  };
  if (!userLoaded || dataLoading) {
    return (
      <div className="text-center py-20 text-xl font-medium">
        Loading data...
      </div>
    );
  }
  if (!data || !data._id) {
    return (
      <div className="text-center py-20 text-xl font-medium text-red-500">
        Error: Could not find kit data to update. Check the ID and API.
      </div>
    );
  }
  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl text-center font-extrabold text-gray-900 mb-6  pb-3">
          Update your Property
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kit Name:
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data.title}
              required
              className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              defaultValue={data.description}
              required
              rows="4"
              className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
            />
          </div>

          {/* Category  */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              defaultValue={data.category}
              name="category"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              <option value="Textile">Textile</option>
              <option value="Pottery">Pottery</option>
              <option value="Gardening">Gardening</option>
              <option value="Arts and Crafts">Arts and Crafts</option>
              <option value="Home Goods">Home Goods</option>
            </select>
          </div>

          {/* Price (Number Input) */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                Tk
              </span>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={data.price}
                required
                min="0"
                step="0.01"
                placeholder="550000"
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
            {/* Stock status */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Status:
            </label>
            <select
              id="stock"
              defaultValue={data.stock_status}
              name="stock"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="pt-2 border-t mt-4 border-gray-200">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Posted By:
            </p>

            {/* User Name  */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                User Name:
              </label>
              <input
                type="text"
                value={user.fullName || user.username || "Anonymous"}
                name="UserName"
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>

            {/* User Email*/}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                User Email:
              </label>
              <input
                type="email"
                name="email"
                value={user.primaryEmailAddress?.emailAddress || "N/A"}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Update
          </button>
        </form>
      </div>
      <Toaster></Toaster>
    </>
  );
}
