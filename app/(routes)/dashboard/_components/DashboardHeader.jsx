import React from "react";
import { ChevronDown } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <div>
      <header className="bg-white border-b border-gray-200 shadow-lg px-6 py-4 ">
        <div className="flex items-center justify-end ">
          {/* Profile */}
          <div className="flex items-center gap-5">
           

            <div className="flex justify-center items-center gap-1">
              <UserButton />
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
