import { AuthProvider } from './(auth)/Provider'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'UI-UX Labs',
  description: 'From Ace Space',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
