'use client'


import { registerWithCredentials } from '@/app/api/users/authActions'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import Link from 'next/link'
// import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { useRouter } from 'next/navigation'
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState,
    watch,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: joiResolver(schema.registerSchema()),
  })

  const onSubmit = async ({ password_confirmation, ...data }) => {
    const res = await registerWithCredentials(data)

    if (res?.statusCode === 409) {
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
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400 w-2/5">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register('name')}
          ></input>
          {errors.name?.message && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
            onClick={() => clearErrors('email')}
          ></input>
          {errors.email?.message && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
          <input
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
            type="password"
            placeholder="Password Confirmation"
            {...register('password_confirmation')}
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
            Register
          </button>
          <Link className="text-sm mt-3 text-right" href={'/'}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
        <span>Password must contain:</span>
      </div>
      <div></div>
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
