"use client";
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo.png";
import ThemeToggle from "../ThemeToggle";
import Loading from "../Loading/Loading";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const getLinkClasses = (href) => {
    const isActive = pathname === href;
    return isActive
      ? "btn btn-sm btn-primary text-white" 
      : "btn btn-sm btn-ghost hover:text-secondary"; 
  };

  const links = (
    <>
      <li><Link href="/" className={getLinkClasses("/")}>Home</Link></li>
      <li><Link href="/all-kits" className={getLinkClasses("/all-kits")}>All Kits</Link></li>
      <li><Link href="/about" className={getLinkClasses("/about")}>About</Link></li>
      {status === "authenticated" && (
        <>
          <li><Link href="/my-list" className={getLinkClasses("/my-list")}>My Purchase</Link></li>
          <li><Link href="/my-review" className={getLinkClasses("/my-review")}>Review</Link></li>
        </>
      )}
      <li className="flex items-center">
         <ThemeToggle />
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-primary/10">
            {links}
          </ul>
        </div>
        
        <div className="flex items-center gap-1">
          <Image src={logo} alt="Logo" width={30} height={30} className="rounded-full ring-1 ring-primary/20" />
          <Link href="/" className="text-xl font-bold font-serif text-primary">
            TerraLoom
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 items-center">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {status === "unauthenticated" ? (
          /* --- JOIN US DROPDOWN --- */
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-secondary text-white shadow-md">
              Join Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-44 p-2 shadow-2xl border border-primary/10 animate__animated animate__fadeIn">
              <li>
                <Link href="/login" className="font-semibold py-3 hover:bg-base-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
              </li>
              <div className="divider my-0 opacity-20"></div>
              <li>
                <Link href="/register" className="font-semibold py-3 hover:bg-base-200 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        ) : status === "authenticated" ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <div className="w-10 rounded-full">
                <Image 
                  src={user?.image || "https://www.w3schools.com/howto/img_avatar.png"} 
                  alt="User Avatar" 
                  width={40} 
                  height={40} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow-2xl border border-primary/10">
              <li className="px-4 py-2 border-b border-base-200">
                <div className="font-bold text-primary">{user?.name}</div>
                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
              </li>
              <li><Link href="/add-kit" className="mt-2">Add Kit</Link></li>
              <li><Link href="/manage-kit">Manage Kits</Link></li>
              <li>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="btn btn-primary btn-sm text-white mt-4"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="w-10 flex justify-center"><Loading /></div>
        )}
      </div>
    </div>
  );
}