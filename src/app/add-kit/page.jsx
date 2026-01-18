"use client";
import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddKitPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let totalKits = 0;

    try {
      const countResponse = await fetch("/api/all-kits");
      const existingKits = await countResponse.json();
      if (Array.isArray(existingKits)) {
        totalKits = existingKits.length;
      }
    } catch (error) {
      toast.error("Failed to determine kit priority.");
      return;
    }

    const newPriority = totalKits + 1;

    const formData = {
      title: e.target.name.value,
      category: e.target.category.value,
      creator_name: session.user.name || "Anonymous",
      creator_email: session.user.email || "N/A",
      stock_status: e.target.stock.value,
      image_url: e.target.imageLink.value,
      created_date: new Date(),
      description: e.target.description.value,
      story: e.target.story.value,
      price: parseFloat(e.target.price.value),
      priority: newPriority,
    };

    fetch("/api/all-kits", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          toast.success(`Kit has been added successfully!`);
          e.target.reset();
          router.push("/all-kits");
        } else {
          toast.error("Failed to add kit.");
        }
      })
      .catch(() => toast.error("Error occurred. Please try again."));
  };

  return (
    <>

      <div className="max-w-xl mx-auto my-10 p-6 bg-base-100 rounded-xl shadow-2xl border border-base-300">
        <h2 className="text-3xl text-center font-extrabold text-base-content mb-6 pb-3">
          Add New Kit
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kit Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Kit Name</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter kit name"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Category</span>
            </label>
            <select
              name="category"
              defaultValue={""}
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

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Description</span>
            </label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea textarea-bordered w-full focus:textarea-primary"
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Price</span>
            </label>
            <div className="join w-full">
              <span className="btn join-item pointer-events-none">Tk</span>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                placeholder="500"
                className="input input-bordered join-item w-full focus:input-primary"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Stock Status</span>
            </label>
            <select
              name="stock"
              defaultValue={""}
              required
              className="select select-bordered w-full focus:select-primary"
            >
              <option value="" disabled>Select Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Image Link */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Image URL</span>
            </label>
            <input
              type="url"
              name="imageLink"
              required
              placeholder="https://example.com/kit.jpg"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          {/* Read Only User Info Section */}
          <div className="pt-4 border-t border-base-300 mt-4">
            <p className="text-lg font-bold text-primary mb-2">Posted By:</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text text-xs opacity-70">User Name</span>
                </label>
                <input
                  type="text"
                  value={session.user.name || "Anonymous"}
                  readOnly
                  className="input input-ghost input-sm bg-base-200 cursor-not-allowed"
                />
              </div>
              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text text-xs opacity-70">User Email</span>
                </label>
                <input
                  type="email"
                  value={session.user.email || "N/A"}
                  readOnly
                  className="input input-ghost input-sm bg-base-200 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-full text-white text-lg mt-4"
          >
            Submit Kit
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
}