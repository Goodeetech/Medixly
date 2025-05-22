"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/SupabaseClient";
import { UserDetailContext } from "@/context/UserDetailContext";

const DashBoardProvider = ({ children }: { children: ReactNode }) => {
  type UserType = {
    email: string;
    name: string;
    picture: string;
    clerkId: string;
    credits: number;
  };

  const [userDetails, setUserDetails] = React.useState<UserType | null>(null);
  const { user, isLoaded } = useUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (isLoaded && user && !hasCreatedUser.current) {
      hasCreatedUser.current = true; // ✅ prevents duplicate execution
      CreateUser();
    }
  }, [isLoaded, user]);

  const CreateUser = async () => {
    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) return;

    let { data: existingUser, error: selectError } = await supabase
      .from("User")
      .select("*")
      .eq("email", email);

    if (selectError) {
      console.error("Error checking for existing user:", selectError);
      return;
    }

    if (!existingUser || existingUser.length === 0) {
      const { data, error } = await supabase
        .from("User")
        .insert([
          {
            email,
            name: user.fullName,
            picture: user.imageUrl,
            clerk_id: user.id,
            credits: 5,
          },
        ])
        .select();

      if (error) {
        toast.error("Error creating user");
      } else {
        toast.success("User created successfully");
        setUserDetails(data[0]);
      }
    } else {
      setUserDetails(existingUser[0]);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default DashBoardProvider;

export const useUserDetails = () => {
  const context = React.useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailProvider");
  }
  return context;
};
