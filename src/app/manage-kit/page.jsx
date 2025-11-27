"use client";
import Loading from "@/components/Loading/Loading";
import Table from "@/components/Table/Table";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function page() {
  const { user, isLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user === null) {
      router.push("/login");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (isLoaded && userEmail) {
      setLoading(true);

      fetch(`https://terraloom-kit-api-server.vercel.app/my-kit?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setKits(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          // console.error("Error fetching kits:", error);
          setLoading(false);
        });
    } else if (isLoaded && user === null) {
      setLoading(false);
      setKits([]);
    }
  }, [isLoaded, userEmail]);


     const handleDelete = (kitId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://terraloom-kit-api-server.vercel.app/all-kits/${kitId}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setKits((prevKits) => prevKits.filter((kit) => kit._id !== kitId));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error");
          });
      }
    });
  };
    if (!isLoaded || loading) {
    return <Loading />;
  }

if (kits.length === 0) {
        return <p className="text-center mt-8 text-gray-600">No kits found.</p>;
    }
    
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-100 flex flex-col mb-20">
           <h1 className="text-center font-bold text-3xl mt-5 mb-5">Posted Kits</h1>
            <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ">
                            Actions
                        </th>
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200 text-center ">
                    {kits.map(kit => (
                        <Table 
                            key={kit._id} 
                            kit={kit} 
                             onDelete={handleDelete}
                           
                        />
                    ))}
                </tbody>
            </table>
            <Toaster></Toaster>
        </div>
    );
}
