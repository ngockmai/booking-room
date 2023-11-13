import { Label } from '@/components/ui/label'
import React from 'react'

const SideBar = () => {
  return (
    <div className="col-span-4 border px-4">
      <div className="grid gap-2">
        <Label htmlFor="room number">Room Number:</Label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Type a room number"
        ></input>
      </div>
    </div>
  )
}

export default SideBar
