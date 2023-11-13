import Header from '@/components/header/Header'

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div>{children}</div>
    </div>
  )
}
