"use client";
import {
  Bell,
  Command,
  Inbox,
  Mail,
  MessageCircle,
  Search,
} from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";

const NavBar = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/"); // Don't redirect until Clerk is ready
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;
  return (
    <div className=" md:flex hidden rounded-xl justify-between px-2 items-center bg-gray-100 mx-6">
      <div className="p-4 w-full flex">
        <div className="bg-white  rounded-full px-6 py-1 flex items-center gap-4">
          <Search className="text-gray-500" />
          <Input
            type="text"
            placeholder="Search medicine"
            className="!border-none !ring-0 !outline-none !focus:outline-none !focus:ring-0 !focus-visible:outline-none !shadow-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400"
          />
          <div className="flex items-center bg-gray-200 px-1 rounded-md ">
            <Command color=" #6a7282" size={16} />
            <h1 className="text-gray-600">F</h1>
          </div>
        </div>
      </div>
      <div className="px-3 flex gap-4 items-center">
        <div className="p-2 bg-white rounded-full">
          <Mail color=" #6a7282" size={20} />
        </div>
        <div className="p-2 bg-white rounded-full">
          <Bell color=" #6a7282" size={20} />
        </div>
        <div className="flex gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="lg:block hidden  text-xs">
            <h2>{user?.fullName}</h2>
            <h3 className="text-gray-500">
              {user?.emailAddresses[0]?.emailAddress}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
