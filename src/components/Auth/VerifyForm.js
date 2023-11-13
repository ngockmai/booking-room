import Link from 'next/link'

const VerifyForm = ({ token, verified, error }) => {
  return (
    <div>
      <h1>Verify Email</h1>
      <h2>{token ? token : 'no token'}</h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}

export default VerifyForm
