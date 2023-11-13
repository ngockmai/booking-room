'use client'

import { forgotPasswordWithCredentials } from '@/app/api/users/authActions'
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

export default function ForgotPasswordPage() {
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
      email: '',
    },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.forgotPasswordSchema()),
  })

  const resetPassword = async (data) => {
    const res = await forgotPasswordWithCredentials(data)

    if (res?.statusCode === 404) {
      setError('email', {
        type: 'server',
        message: `${res.message}`,
      })
      setFocus('email')
    } else if (res?.statusCode === 201) {
      toast.info(`Please check ${data.email} to verify your email`)
      reset()
    } else {
      toast.info(`Error occurred during registration. Please contact admin`)
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form
              onSubmit={handleSubmit(resetPassword)}
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
