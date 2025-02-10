"use client";
import React, { useEffect, useState } from "react";
import { LayoutDashboard, Wallet, Receipt, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const path = usePathname();
  const [userData, setUserData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Wallet, label: "Expenses", href: "/dashboard/expenses" },
    { icon: Receipt, label: "Budgets", href: "/dashboard/budget" },
  ];

  const { user } = useUser();

  // for automatically hidde the navbar on scroll
  const controllScroll = () => {
    if (window.scrollY > 200) {
      setToggle(false);
    } 
  };

  useEffect(() => {
    window.addEventListener('scroll', controllScroll);

    // Remove the event listener when the component is unmounted
    // to prevent memory leaks
    return () => {
      window.removeEventListener('scroll', controllScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const toggleNavbar = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div
        className={`absolute ${
          toggle ? "hidden" : ""
        } top-2 left-5  bg-gradient-to-r from-[#00BCC6] to-[#0097B2] p-2 rounded-lg z-10 cursor-pointer`}
      >
        <PanelsTopLeft
          strokeWidth={2.5}
          onClick={toggleNavbar}
          className="text-white"
        />
      </div>

      <div
        className={`fixed top-0 md:relative min-h-screen ${
          toggle ? "" : "hidden"
        } w-64 bg-white z-50  shadow-lg`}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-[#00BCC6]/10 to-transparent rounded-br-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#00BCC6]/5 to-transparent rounded-tr-full blur-3xl" />
        </div>

        <div className="relative flex flex-col h-dvh ">
          {/* Logo Section */}
          <div className={`px-6 py-5 border-b shadow-lg `}>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg bg-gradient-to-r from-[#00BCC6] to-[#0097B2] flex items-center justify-center cursor-pointer"
                onClick={toggleNavbar}
              >
                <Wallet className=" text text-white" />
              </div>

              <h1 className=" text-xl font-bold bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-transparent bg-clip-text">
                ExpenseTracker
              </h1>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className={`p-4 mt-10 `}>
            <ul className="flex flex-col gap-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-xl group tracking-wide ${
                        path === item.href
                          ? "bg-gradient-to-r from-[#00BCC6] to-[#0097B2]  text-white "
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-[#00BCC6]/10 hover:to-transparent transition-all duration-200 "
                      } `}
                    >
                      <Icon
                        className={` ${
                          path === item.href
                            ? "text-white"
                            : "group-hover:text-[#00BCC6]"
                        } `}
                      />

                      <div className="flex-1">
                        <span
                          className={`${
                            path === item.href
                              ? "text-white"
                              : "group-hover:text-[#00BCC6]"
                          } font-medium`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="flex absolute bottom-10 items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-transparent">
            <div className="p-2 rounded-full bg-gray-200 flex justify-center items-center">
              <UserButton />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                {userData?.fullName}
              </h3>
              <p className="text-xs text-gray-500">
                {userData?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
