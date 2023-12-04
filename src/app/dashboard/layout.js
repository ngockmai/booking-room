import Header from '@/components/header/Header'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}
