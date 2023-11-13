"use client"
import React from "react";
import Link from 'next/link';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaUser } from 'react-icons/fa';


export default function App() {
  return (
    <Dropdown className="relative inline-block text-right">
      <DropdownTrigger>
        <Button  variant="bordered"
          className="bg-black-500 font-semibold text-black border-2 border-black-600 px-4 py-2 rounded-md flex items-center space-x-2">
        <FaUser />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <DropdownItem key="User Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Link href="/" legacyBehavior>
            <a>User Profile</a>
          </Link>
        </DropdownItem>
        <DropdownItem key="Logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Link href="/user/logout" legacyBehavior>
            <a>Logout</a>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
