import { authOptions } from '../../api/auth/[...nextauth]/route'
// import RegisterForm from './components/RegisterForm'
import RegisterForm from './components/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Register() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  // return <RegisterForm />
  return <RegisterForm />
}
