"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl md:text-2xl bg-gradient-to-t from-[#00BCC6] to-[#0097B2] bg-clip-text text-transparent font-bold "
            >
              Expense Tracker
            </Link>
          </div>

          <div className="flex justify-center items-center gap-8 text-sm tracking-wider ">
            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#00BCC6] hover:bg-[#00a3ac] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCC6] transition-colors duration-200"
              >
                Get Started
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:flex text-black px-5 py-2 border border-gray-200 rounded-md shadow-md hover:shadow-inner hover:shadow-black hover:text-gray-600 active:scale-95 cursor-pointer transition-all duration-300"
                >
                  Dashboard
                </Link>{" "}
                <div className="bg-gray-200 p-2 rounded-full flex justify-center items-center">
                  <UserButton />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
