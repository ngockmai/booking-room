'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { changePassword, updateUser } from '@/app/api/users/authActions'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { useRouter } from 'next/navigation'

export default function UserInfo({ user }) {
  const { data: session, status, update } = useSession()
  // console.log(session)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    reset,
    setValue,
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

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    defaultValues: { newPassword: '', newPassword_confirmation: '' },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.changePasswordSchema()),
  })

  if (status === 'loading') return <div>Loading...</div>

  if (status === 'unauthenticated') return <div>Access Denied</div>

  const handleUpdateUser = async (data) => {
    const res = await updateUser(data)
    if (res?.statusCode === 200) {
      reset()
      setValue('name', res?.userData?.name)
      setValue('phoneNumber', res?.userData?.phoneNumber)
      setValue('organization', res?.userData?.organization)
      setValue('address', res?.userData?.address)
      setValue('city', res?.userData?.city)
      setValue('province', res?.userData?.province)
      setValue('country', res?.userData?.country)
      setValue('postalCode', res?.userData?.postalCode)
      console.log(session)
      // router.push('/dashboard/profile')
      toast.info('Profile updated')
    }
  }

  const handleChangePassword = async (data) => {
    const res = await changePassword(data)
    if (res?.statusCode === 200) {
      toast.info('Password changed')
      resetPassword()
    } else if (res?.statusCode === 500) {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="border rounded-lg my-5">
        <div className="container mx-auto my-5 px-5">
          <h2 className="text-xl mb-4 mt-4">Personal Information</h2>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  id="name"
                  {...register('name')}
                />
                {errors.name?.message && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber?.message && (
                  <p className="text-sm text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="organization"
                >
                  Organization:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="address"
                  id="address"
                  {...register('address')}
                />
                {errors.address?.message && (
                  <p className="text-sm text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="city"
                  id="city"
                  {...register('city')}
                />
                {errors.city?.message && (
                  <p className="text-sm text-red-400">{errors.city.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="province"
                >
                  Province:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="province"
                  id="province"
                  {...register('province')}
                />
                {errors.province?.message && (
                  <p className="text-sm text-red-400">
                    {errors.province.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="country"
                  id="country"
                  {...register('country')}
                />
                {errors.country?.message && (
                  <p className="text-sm text-red-400">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code:
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  {...register('postalCode')}
                />
                {errors.postalCode?.message && (
                  <p className="text-sm text-red-400">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-24 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="border rounded-lg my-5">
        <div className="container mx-auto my-5 px-5">
          <h2 className="text-xl mb-4 mt-4">Change password</h2>
          <form onSubmit={handleSubmitPassword(handleChangePassword)}>
            <div className="grid grid-cols gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Current Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  {...registerPassword('password')}
                />
                {errorsPassword.password?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errorsPassword.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  {...registerPassword('newPassword')}
                />
                {errorsPassword.newPassword?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errorsPassword.newPassword?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword_confirmation"
                >
                  Confirm Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="newPassword_confirmation"
                  id="newPassword_confirmation"
                  {...registerPassword('newPassword_confirmation')}
                />
                {errorsPassword.newPassword_confirmation?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errorsPassword.newPassword_confirmation?.message}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <p className="mt-2 text-sm text-left text-gray-700">
                  Password must contain:
                </p>
                <ul className="text-xs">
                  <li className="indent-1">- At least 8 characters</li>
                  <li className="indent-1">- At least 1 special character</li>
                  <li className="indent-1">- At least 1 uppercase character</li>
                  <li className="indent-1">- At least 1 numberic character</li>
                </ul>
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-24 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
