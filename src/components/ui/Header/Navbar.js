'use client'

import UserDropDown from './UserDropDown'
import Logo from './Logo'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-gray-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex items-center">
          <ul className="flex justify-center space-x-4">
            {/* <li>
              <Link
                href={'/settings'}
                className="font-semibold hover:shadow-lg"
              >
                Admin Settings
              </Link>
            </li> */}
            <li>
              <Link
                href={'/facilities'}
                className="font-semibold hover:shadow-lg"
              >
                Facilities
              </Link>
            </li>
            <li>
              <Link
                href={'/find-room'}
                className="font-semibold hover:shadow-lg"
              >
                Find A Room
              </Link>
            </li>
            <li>
              <Link
                href={'/my-bookings'}
                className="font-semibold hover:shadow-lg"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href={'/settings'}
                className="font-semibold hover:shadow-lg"
              >
                BackEnd
              </Link>
            </li>
          </ul>
        </div>
        <UserDropDown />
      </div>
    </nav>
  )
}

export default Navbar