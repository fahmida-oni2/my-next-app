
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Table({ kit ,onDelete}) {
  const { title, category, stock_status, price, created_date, _id,image_url } = kit || {};
  const stockClass =
    stock_status === "In Stock"
      ? "bg-green-100 text-green-800"
      : stock_status === "Low Stock"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  const formattedDate = new Date(
    kit.created_date || new Date()
  ).toLocaleDateString();

  const formattedPrice = (kit.price || 0).toFixed(2);

 
  return (
    <tr className="border-b hover:bg-gray-50 transition duration-150 ">
      <td>
        <Image
                  src={image_url} 
                  alt="image"
                  width={100}
                  height={60}
                  style={{ objectFit: 'cover' }} 
                  className='p-2 items-center' 
                />
          
      </td>
      <td className="px-6 py-4  text-black font-bold whitespace-nowrap">
        <Link href={`/all-kits/${_id}`}>{title}</Link>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-black whitespace-nowrap">{category}</td>

      {/* Price */}
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {formattedPrice} TK
      </td>

      {/* Stock Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${stockClass}`}
        >
          {stock_status}
        </span>
      </td>

      {/* Date Created */}
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {formattedDate}
      </td>

      {/* Actions (Delete Button) */}
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <Link
          href={`/all-kits/${_id}`}
          className="inline-flex items-center r w-15 px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  bg-secondary hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mr-3"
        >
          View
        </Link>
         <Link
          href={`/update-kit/${_id}`}
          className="inline-flex items-center w-15 px-2  py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mr-3"
        >
          Update
        </Link>

        <button
          onClick={() => onDelete(_id)}
          className="inline-flex items-center w-15 py-2 px-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
        >
          Delete
        </button>
      </td>
    
    </tr>
  );
}
