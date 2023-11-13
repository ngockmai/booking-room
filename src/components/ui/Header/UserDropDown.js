'use client'

import SignOut from '../../Auth/SignOut'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'
import { FaUser, FaAngleDown } from 'react-icons/fa'

import { useSession } from 'next-auth/react'

export default function UserDropDown() {
  const { data: session, status } = useSession();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='px-2 py-1'>
          <FaUser className='inline'/>
          <p className='inline px-2'>{session?.user?.name}</p>
          <FaAngleDown className='inline'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>User Profile</DropdownMenuItem>
          <DropdownMenuItem><SignOut /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}