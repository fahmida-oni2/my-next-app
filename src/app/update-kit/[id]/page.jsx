"use client";
import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
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
        const res = await fetch(`/api/all-kits/${kitId}`);
        if (!res.ok) throw new Error("Failed to fetch kit data");
        const data = await res.json();
        setKitData(data.result || data || {});
      } catch (error) {
        toast.error("Failed to load initial kit data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [kitId]);

  return { kitData, isLoading };
};

export default function UpdatePage() {
  const router = useRouter();
  const params = useParams();
  const kitId = params.id;
  const { data: session, status } = useSession();

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
      creator_name: session?.user?.name || "Anonymous",
      creator_email: session?.user?.email || "N/A",
      stock_status: e.target.stock.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
    };

    fetch(`/api/all-kits/${currentKitId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Kit has been updated successfully");
        router.push(`/all-kits/${currentKitId}`);
        router.refresh(); 
      })
      .catch(() => {
        toast.error("Error updating kit");
      });
  };

  if (status === "loading" || dataLoading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (!data || !data._id) {
    return (
      <div className="text-center py-20 text-xl font-medium text-error">
        Error: Could not find kit data to update.
      </div>
    );
  }

  return (
    <>

      <div className="max-w-xl mx-auto my-10 p-6 bg-base-100 rounded-xl shadow-2xl border border-base-300">
        <h2 className="text-3xl text-center font-extrabold text-base-content mb-6 pb-3">
          Update Kit Details
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Kit Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data.title}
              required
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={data.description}
              required
              rows="4"
              className="textarea textarea-bordered w-full focus:textarea-primary"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Category</span>
            </label>
            <select
              defaultValue={data.category}
              name="category"
              required
              className="select select-bordered w-full focus:select-primary"
            >
              <option value="" disabled>Select Category</option>
              <option value="Textile">Textile</option>
              <option value="Pottery">Pottery</option>
              <option value="Gardening">Gardening</option>
              <option value="Arts and Crafts">Arts and Crafts</option>
              <option value="Home Goods">Home Goods</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Price</span>
            </label>
            <div className="join w-full">
              <span className="btn join-item pointer-events-none bg-base-200">Tk</span>
              <input
                type="number"
                name="price"
                defaultValue={data.price}
                required
                min="0"
                step="0.01"
                className="input input-bordered join-item w-full focus:input-primary"
              />
            </div>
          </div>

          {/* Stock Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Stock Status</span>
            </label>
            <select
              defaultValue={data.stock_status}
              name="stock"
              required
              className="select select-bordered w-full focus:select-primary"
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* User Info Section (Read Only) */}
          <div className="pt-4 border-t border-base-300 mt-4">
            <p className="text-lg font-bold text-primary mb-2">Editor Info:</p>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                value={session?.user?.name || "Anonymous"}
                readOnly
                className="input input-sm bg-base-200 cursor-not-allowed"
              />
              <input
                type="email"
                value={session?.user?.email || "N/A"}
                readOnly
                className="input input-sm bg-base-200 cursor-not-allowed"
              />
            </div>
          </div>


          <button
            type="submit"
            className="btn btn-secondary w-full text-white text-lg mt-4"
          >
            Update Kit
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
}