import {
  Bell,
  Command,
  Inbox,
  Mail,
  MessageCircle,
  Search,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const NavBar = () => {
  return (
    <div className=" flex rounded-xl justify-between px-2 items-center bg-gray-100 mx-6">
      <div className="p-4 w-full flex">
        <div className="bg-white  rounded-full px-6 py-1 flex items-center gap-4">
          <Search className="text-gray-500" />
          <Input
            type="text"
            placeholder="Search drugs"
            className="!border-none !ring-0 !outline-none !focus:outline-none !focus:ring-0 !focus-visible:outline-none !shadow-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400"
          />
          <div className="flex items-center bg-gray-200 px-1 rounded-md ">
            <Command color=" #6a7282" size={16} />
            <h1 className="text-gray-600">F</h1>
          </div>
        </div>
      </div>
      <div className="px-3 flex gap-4">
        <div className="p-2 bg-white rounded-full">
          <Mail color=" #6a7282" size={20} />
        </div>
        <div className="p-2 bg-white rounded-full">
          <Bell color=" #6a7282" size={20} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
