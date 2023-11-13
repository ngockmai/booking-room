'use client'

import { updateUser } from '@/app/api/users/authActions'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const ProfileUpdateForm = ({ user }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: session?.user?.name || user.name,
      phoneNumber: session?.user?.phoneNumber || user.phoneNumber,
      organization: session?.user?.organization || user.organization,
      address: session?.user?.address || user.address,
      city: session?.user?.city || user.city,
      province: session?.user?.province || user.province,
      country: session?.user?.country || user.country,
      postalCode: session?.user?.postalCode || user.postalCode,
    },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.updateProfileSchema()),
  })
  if (status === 'loading') return <div>Loading...</div>

  if (status === 'unauthenticated') return <div>Access Denied</div>

  const handleUpdateUser = async (data) => {
    const res = await updateUser(data)
    if (res?.statusCode === 200) {
      reset()
      router.push('/profile')
    }
    console.log(res)
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Profile Update</h1>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" {...register('name')} />
          {errors.name?.message && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            {...register('phoneNumber')}
          />
          {errors.phoneNumber?.message && (
            <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="organization">Organization </label>
          <input
            type="text"
            name="organization"
            id="organization"
            {...register('organization')}
          />
          {errors.organization?.message && (
            <p className="text-sm text-red-400">
              {errors.organization.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            id="address"
            {...register('address')}
          />
          {errors.address?.message && (
            <p className="text-sm text-red-400">{errors.address.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input type="text" name="city" id="city" {...register('city')} />
          {errors.city?.message && (
            <p className="text-sm text-red-400">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="province">Province: </label>
          <input
            type="text"
            name="province"
            id="province"
            {...register('province')}
          />
          {errors.province?.message && (
            <p className="text-sm text-red-400">{errors.province.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input
            type="text"
            name="country"
            id="country"
            {...register('country')}
          />
          {errors.country?.message && (
            <p className="text-sm text-red-400">{errors.country.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code: </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            {...register('postalCode')}
          />
          {errors.postalCode?.message && (
            <p className="text-sm text-red-400">{errors.postalCode.message}</p>
          )}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Update
        </button>
        <Link href="/profile">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  )
}

export default ProfileUpdateForm
