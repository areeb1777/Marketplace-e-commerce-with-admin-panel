// src/app/not-found.js
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <Image src="/images/404.jpg" alt="404 Not Found" width={500} height={500} className='w-48' />
      <h1 className="text-5xl font-bold text-gray-800 mt-8">Page Not Found</h1>
      <p className="text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <div className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 cursor-pointer">
          Go to Home
        </div>
      </Link>
    </div>
  );
}
