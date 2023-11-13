'use client'

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
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm({ callbackUrl }) {
  const [notifyError, setNotifyError] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.loginSchema()),
  })

  const onSubmitSignIn = async ({ email, password }) => {
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl,
    })
    console.log(email, password, callbackUrl)

    // if (res?.ok) {
    //   router.replace('/')
    // }

    // if (res?.status === 401) {
    //   setError('root.serverError', {
    //     type: res.status,
    //     message: `${res.error}`,
    //   })
    //   setEmailHasNotBeenVerified(email)
    //   setNotifyError(true)
    // }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Log in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form
              onSubmit={handleSubmit(onSubmitSignIn)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder=""
                  {...register('email')}
                  onClick={() => clearErrors('email')}
                ></input>
                {errors.email?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder=""
                  {...register('password')}
                ></input>
                {errors.password?.message && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div>
                <p className="mt-1 text-sm text-left text-gray-700">
                  <Link href={'/forgot-password'}>
                    <span className="text-blue-600 hover:underline">
                      {' '}
                      Forgot your password?{' '}
                    </span>
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Login
              </button>
              {notifyError && (
                <div>
                  <div className="text-[0.8rem] font-medium text-destructive">
                    {errors.root.serverError.message}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-right text-gray-700">
              {' '}
              Don&apos;t have an account?{' '}
              <Link href={'/register'}>
                <span className="text-blue-600 hover:underline">Register</span>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
