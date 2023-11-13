'use client'

import { resetPasswordWithCredentials } from '@/app/api/users/authActions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage({ searchParams: { token } }) {
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
      toast.info(
        <div>
          <h2 className="text-xl font-bold my-4">Password Changed</h2>
          <p>Your password has been successfully changed. </p>
          <p className="mt-2 text-sm text-right text-gray-700">
            {' '}
            Return to login?{' '}
            <Link href={'/login'}>
              <span className="text-blue-600 hover:underline">Login</span>
            </Link>
          </p>
        </div>
      )
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
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Reset Password?
            </CardTitle>
            <CardDescription className="text-center">
              Enter new password to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  name="password"
                  placeholder=""
                  {...register('password')}
                ></input>
                {errors.password?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Password Confirmation</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="password_confirmation"
                  type="password"
                  placeholder=""
                  {...register('password_confirmation')}
                  onClick={() => clearErrors('password_confirmation')}
                ></input>
                {errors.password_confirmation?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.password_confirmation?.message}
                  </p>
                )}
              </div>
              <div>
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

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Reset Password
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-right text-gray-700">
              {' '}
              Return to login?{' '}
              <Link href={'/login'}>
                <span className="text-blue-600 hover:underline">Login</span>
              </Link>
            </p>
          </CardFooter>
        </Card>
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
