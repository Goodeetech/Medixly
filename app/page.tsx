import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>let build a remainder app</h1>
      <div>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button className="cursor-pointer rounded-full px-4">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
      <SignedIn>
        <Link href="/dashboard">
          <Button className="cursor-pointer">Dashboard</Button>
        </Link>
      </SignedIn>
    </div>
  );
}
