"use client";
import React, { useEffect } from "react";
import SideNavbar from "./_components/SideNavbar";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  const checkUserBudget = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log("User email not found");
      return;
    }

    try {
      const response = await fetch(
        `/api/budget/checkbudget?email=${user.primaryEmailAddress.emailAddress}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // No budget found, redirect to budget creation
          router.replace("/dashboard/budget");
        }
        return;
      }

      const data = await response.json();
      if (!data.budget) {
        router.replace("/dashboard/budget");
      }
    } catch (error) {
      console.error("Error checking budget:", error);
    }
  };

  useEffect(() => {
    if (user) {
      checkUserBudget();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen">
      <div>
        <SideNavbar />
      </div>
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
