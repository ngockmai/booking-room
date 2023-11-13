'use client'

import { forgotPasswordWithCredentials } from '@/app/api/users/authActions'
import schema from '@/lib/validationSchema'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-bold my-4">Email Address</h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(resetPassword)}
        >
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            onClick={() => clearErrors('email')}
          ></input>
          {errors.email?.message && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Reset Password
          </button>
        </form>
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
