import { AuthProvider } from './(auth)/Provider'
import './globals.css'

export const metadata = {
  title: 'UI-UX Labs',
  description: 'From Ace Space',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans">
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
