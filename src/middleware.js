import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    //   const { pathname, origin } = req.nextUrl
    //   const { token } = req.nextauth
    // if(pathname.startsWith('/dashboard') && token?.user?.role !== 'admin'){
    //   // return NextResponse.redirect(origin)
    //   return new NextResponse('You are not authorized!')
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token // true => middleware() is run
      },
    },
  }
)
// export { default } from 'next-auth/middleware'

export const config = { matcher: ['/', '/dashboard/:path*', '/profile/:path*'] }
