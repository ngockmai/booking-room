// 'use client'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserInfo from '@/app/dashboard/profile/components/UserInfo'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React from 'react'

const Profile = async () => {
  const session = await getServerSession(authOptions)

  // const { data: session, status, update } = useSession()

  // if (status === 'loading') return <div>Loading...</div>

  // if (status === 'unauthenticated') return <div>Access Denied</div>

  return (
    <div>
      <UserInfo user={session?.user} />
    </div>
  )
}

export default Profile
