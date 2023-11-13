import Logo from './Logo'
import Navbar from './NavBar'
import UserNav from './UserNav'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-6 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="mr-3">
              <Logo />
            </div>
          </Link>
        </div>
        <Navbar className="flex items-center space-x-6 text-sm font-medium" />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default Header
