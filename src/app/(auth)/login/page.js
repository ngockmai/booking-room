import { authOptions } from '../../api/auth/[...nextauth]/route'
import LoginForm from './components/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Login({ searchParams: { callbackUrl } }) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  return (
    <main>
      <LoginForm callbackUrl={callbackUrl || '/'} />
    </main>
  )
}
