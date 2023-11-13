'use client'

import { fetchUserData } from '@/app/api/users/authActions'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function UserInfo() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUserData()
      if (res?.statusCode === 200 && res?.userData) {
        setUserData(res?.userData)
      }
      console.log('res', res)
    }
    fetchData()
  }, [])

  useEffect(() => {}, [userData])

  return (
    <div>
      <h1>Profile Client</h1>
      <h2>
        Name: <span className="font-bold">{userData?.name}</span>
      </h2>
      <h2>
        Email:<span className="font-bold">{userData?.email}</span>
      </h2>
      <h4>Phone number: {userData?.phoneNumber}</h4>
      <h4>Organization: {userData?.organization}</h4>
      <h4>Role: {userData?.role}</h4>
      <h4>Address: {userData?.address}</h4>
      <h4>City: {userData?.city}</h4>
      <h4>Province: {userData?.province}</h4>
      <h4>Country: {userData?.country}</h4>
      <h4>postalCode: {userData?.postalCode}</h4>
      <Link className="text-blue-500 hover:underline" href="/profile/update">
        <button>Update Profile</button>
      </Link>
    </div>
  )
}
