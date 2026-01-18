import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  const db = await getDb();
  let rawData = null;

  try {
    rawData = await db.collection("kit-collection").findOne({ 
      _id: new ObjectId(id) 
    });
  } catch (err) {
    console.error("Invalid ID format:", id);
  }


  if (!rawData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Kit Not Found</h1>
      </div>
    );
  }


  const data = JSON.parse(JSON.stringify(rawData));

  const {
    _id, title, price, image_url, category, creator_name,
    creator_email, created_date, stock_status, description, story
  } = data;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="lg:flex grid grid-cols-1 gap-5 m-10 items-center">
        <div className="mr-10">
          <Image
            className="rounded-2xl shadow-xl border border-gray-200"
            src={image_url}
            alt={title}
            width={500}
            height={400}
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="space-y-3 p-5">
          <h1 className="font-extrabold text-3xl text-primary">{title}</h1>
          <p className="font-bold text-xl">Category: <span className="badge badge-secondary">{category}</span></p>
          
          <div className="text-sm space-y-1 text-gray-600">
            <p>Posted by: <span className="font-semibold text-secondary">{creator_name}</span></p>
            <p>Contact: <span className="font-semibold">{creator_email}</span></p>
            <p>Date: {created_date}</p>
          </div>

          <div className="divider"></div>

          <div className="flex gap-10 items-center">
            <div>
              <p className="text-sm font-bold uppercase text-gray-400">Status</p>
              <p className="font-extrabold text-2xl">{stock_status}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-gray-400">Price</p>
              <p className="font-extrabold text-2xl text-secondary">{price} TK</p>
            </div>
          </div>

          <div className="py-4">
            <p className="font-bold text-lg border-b-2 border-primary w-fit mb-2">Description</p>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {story && (
            <div className="py-4 bg-gray-50 p-4 rounded-xl italic">
              <p className="font-semibold text-primary mb-1">The Story</p>
              <p className="text-gray-600">"{story}"</p>
            </div>
          )}

          <div className="pt-5">
            <AddToCartButton kitData={data} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5">
        <ReviewForm kitData={data} />
      </div>

      <div className="flex justify-center py-10">
        <Link href="/all-kits" className="btn btn-outline btn-secondary px-10">
          Go Back
        </Link>
      </div>
    </div>
  );
}