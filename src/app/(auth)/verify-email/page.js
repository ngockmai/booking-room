import { verifyWithCredentials } from '@/app/api/users/authActions'
import { redirect } from 'next/navigation'

const VerifyEmailPage = async ({ searchParams: { token } }) => {
  const res = await verifyWithCredentials(token)

  return (
    <div>
      <h1 style={{ color: 'green' }}>{res?.message}</h1>
    </div>
  )
}

export default VerifyEmailPage
