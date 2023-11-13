'use server'

import ProfileUpdateForm from './components/ProfileUpdateForm'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const ProfileUpdatePage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ProfileUpdateForm user={session?.user} />
    </div>
  )
}

export default ProfileUpdatePage
