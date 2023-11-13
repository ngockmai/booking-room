'use client'

// import { resetPasswordWithCredentials } from '@/app/api/users/authActions'
import { resetPasswordWithCredentials } from '@/app/api/users/authActions'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage({ searchParams: { token } }) {
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [notifyError, setNotifyError] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '' },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.newPasswordSchema()),
  })

  const handleResetPassword = async ({ password }) => {
    const res = await resetPasswordWithCredentials({ token, password })
    console.log(res)
    if (res?.statusCode === 200) {
      setPasswordChanged(true)
      reset()
    } else if (res?.statusCode === 500) {
      toast.error(
        <div>
          <p>{res.message}</p>
          <Link className="content-center" href="/forgot-password">
            <button className="content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Reset again
            </button>
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        {passwordChanged ? (
          <div>
            <h1 className="text-xl font-bold my-4">Password Changed</h1>
            <p>Your password has been successfully changed. </p>
            <Link className="content-center" href="/login">
              <button className="content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold my-4">New Password</h1>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <input
                name="password"
                type="password"
                placeholder="Password"
                {...register('password')}
              ></input>
              {errors.password?.message && (
                <p className="text-sm text-red-400 max-w-sm">
                  {errors.password.message}
                </p>
              )}
              <input
                name="password_confirmation"
                type="password"
                placeholder="Password Confirmation"
                {...register('password_confirmation')}
                onClick={() => clearErrors('password_confirmation')}
              ></input>
              {errors.password_confirmation?.message && (
                <p className="text-sm text-red-400 max-w-sm">
                  {errors.password_confirmation.message}
                </p>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={false}
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
