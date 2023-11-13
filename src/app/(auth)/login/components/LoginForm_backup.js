'use client'

import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm({ callbackUrl }) {
  const [emailHasNotBeenVerified, setEmailHasNotBeenVerified] = useState('')
  const [notifyError, setNotifyError] = useState(false)

  const router = useRouter()

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
    return console.log(res)
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmitSignIn)}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
            onClick={() => {
              setNotifyError(false)
            }}
          ></input>
          {errors.email?.message && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            onClick={() => {
              setNotifyError(false)
            }}
          ></input>
          {errors.password?.message && (
            <p className="text-sm text-red-400 max-w-sm">
              {errors.password.message}
            </p>
          )}
          <Link className="text-sm mb-1 text-left" href={'/forgot-password'}>
            <span className="underline italic text-blue">
              Forgot your password?
            </span>
          </Link>
          <button
            type="submit"
            onClick={() => clearErrors('root.serverError')}
            className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login
          </button>
          {notifyError && (
            <div>
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {errors.root.serverError.message}
              </div>
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={'/register'}>
            Don&apos;t have an account?{' '}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}
