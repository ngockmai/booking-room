'use client'

import { EyeFilledIcon } from '@/components/ui/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/components/ui/EyeSlashFilledIcon'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm({ callbackUrl }) {
  const [notifyError, setNotifyError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

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

    // console.log(email, password, callbackUrl)

    // if (res?.ok) {
    //   router.replace('/')
    // }

    // console.log(res)

    // if (res?.statusCode === 401) {
    //   setError('root.serverError', {
    //     type: res.statusCode,
    //     message: `${res.error}`,
    //   })
    //   setNotifyError(true)
    // }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card className="py-4 px-5">
          <CardHeader className="py-5 px-4 flex-col items-start space-y-2">
            <p className="text-2xl text-center">Log in to your account</p>
            <small className="text-default-500">
              Enter your email and password to login
            </small>
          </CardHeader>

          <CardBody className="py-2">
            <form
              onSubmit={handleSubmit(onSubmitSignIn)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-2">
                <Input
                  size="md"
                  type="text"
                  label="Email"
                  placeholder=""
                  color={errors.email?.message ? 'danger' : 'default'}
                  errorMessage={errors.email?.message}
                  {...register('email')}
                  onClick={() => clearErrors('email')}
                ></Input>
              </div>

              <div className="grid gap-2">
                <Input
                  size="md"
                  label="Password"
                  placeholder=""
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  color={errors.password?.message ? 'danger' : 'default'}
                  errorMessage={errors.password?.message}
                  {...register('password')}
                ></Input>
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
              <Button type="submit" radius="sm" color="primary">
                Login
              </Button>
              {notifyError && (
                <div>
                  <div className="text-[0.8rem] font-medium text-destructive">
                    {errors.root.serverError.message}
                  </div>
                </div>
              )}
            </form>
          </CardBody>
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
