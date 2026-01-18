"use client";
import Loading from "@/components/Loading/Loading";
import Table from "@/components/Table/Table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function MyKitsPage() {
  const { data: session, status } = useSession();
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && userEmail) {
      setLoading(true);
      fetch(`/api/my-kit?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setKits(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [status, userEmail]);

  const handleDelete = (kitId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2D4F1E", 
      cancelButtonColor: "#C0573E",  
      confirmButtonText: "Yes, delete it!",
      background: "var(--tw-bg-opacity, #FBFBF2)", 
      color: "var(--tw-text-opacity, #1f2937)",    
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/all-kits/${kitId}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        })
          .then((res) => res.json())
          .then(() => {
            setKits((prevKits) => prevKits.filter((kit) => kit._id !== kitId));
            Swal.fire({
              title: "Deleted!",
              text: "Your kit has been deleted.",
              icon: "success",
              confirmButtonColor: "#2D4F1E",
            });
          })
          .catch(() => {
            toast.error("Error deleting kit");
          });
      }
    });
  };

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (kits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-xl font-semibold text-base-content">No kits found.</p>
        <button 
           onClick={() => router.push('/add-kit')} 
           className="btn btn-primary mt-4"
        >
          Add Your First Kit
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-20">
      <h1 className="text-center font-bold text-3xl mt-10 mb-8 text-base-content">
        My Posted Kits
      </h1>
      
  
      <div className="overflow-x-auto shadow-2xl rounded-xl border border-base-300 bg-base-100">
        <table className="table w-full">

          <thead className="bg-base-200">
            <tr className="text-base-content">
              <th className="text-center">Image</th>
              <th className="text-center">Title</th>
              <th className="text-center">Category</th>
              <th className="text-center">Price</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-base-300">
            {kits.map((kit) => (
              <Table 
                key={kit._id} 
                kit={kit} 
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}