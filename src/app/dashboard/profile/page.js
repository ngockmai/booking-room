import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserInfo from '@/app/dashboard/profile/components/UserInfo'
import { getServerSession } from 'next-auth'
import React from 'react'

const Profile = async () => {
  const session = await getServerSession(authOptions)

  // const { data: session, status, update } = useSession()

  // if (status === 'loading') return <div>Loading...</div>

  // if (status === 'unauthenticated') return <div>Access Denied</div>

  return (
    <div className="flex flex-col z-40 w-full items-center justify-center">
      <div className="container relative flex flex-col gap-2 pt-8 md:pt-12 pb-2">
        <h1 className="text-2xl font-bold mb-5">User Profile</h1>
        <p className="text-base">
          You are logged in as: <b>{session?.user?.role}</b>
        </p>
      </div>
      <div className="container grid grid-cols-12 gap-2">
        <div className="col-span-12">
          {session && <UserInfo user={session.user} />}
        </div>
      </div>
    </div>
  )
}

export default Profile
