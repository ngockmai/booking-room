import Image from 'next/image'

const Logo = () => {
  return (
    <div className="flex items-center justify-between">
      <Image
        className="mx-3"
        src="/images/logo.svg"
        alt="Your Logo"
        width={40}
        height={40}
      />
      <div className="hidden h-6 text-xl font-semibold sm:block">
        Khuong Room Booking
      </div>
    </div>
  )
}

export default Logo
