"use client";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-12 sm:pt-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00BCC6]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#00BCC6]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center space-y-10">
          {/* Left Column - Text Content */}
          <div className="flex flex-col max-w-xl mx-auto lg:mx-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="block mb-2">Smart Way to</span>
              <span className="bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-transparent bg-clip-text">
                Track Expenses
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Take control of your finances with our intuitive expense tracking
              solution. Monitor spending, set budgets, and achieve your
              financial goals with ease.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={isSignedIn ? "/dashboard" : "/sign-in"}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-[#00BCC6] to-[#0097B2] hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#00BCC6]/25"
              >
                {isSignedIn ? (
                  <p className="flex justify-center items-center gap-1">Go to Dashboard <ArrowRight /></p>
                ) : "Get Started Now - It's Free"}
              </Link>
              <Link
                href="/learn-more"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative  ">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00BCC6]/20 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-white/10 p-10 rounded-3xl shadow-xl shadow-black/10">
              <Image
                src="/Expense-tracker.png"
                alt="Expense Tracking Illustration"
                width={1000}
                height={1000}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
