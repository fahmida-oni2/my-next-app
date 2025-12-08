import Link from 'next/link'
import React from 'react'

export default function ErrorKit() {
  return (
     <div className='flex flex-col min-h-screen  space-y-3 items-center justify-center'>
    
            <h1 className='text-center font-extrabold text-4xl '>OPPS!! Kit NOT FOUND</h1>
            <p className='text-center  '>The Kit you are requesting is not found on our website.  please try another kit</p>
            <div className='flex items-center justify-center'>
             <Link href='/' className='btn rounded-xl text-white  bg-secondary'>Go Back!</Link>
            </div>
        </div>
  )
}
