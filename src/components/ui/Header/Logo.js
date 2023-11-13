import Image from 'next/image';

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/logo.jpeg"
        alt="Your Logo"
        width={150}
        height={50}
      />
    </div>
  );
};

export default Logo;