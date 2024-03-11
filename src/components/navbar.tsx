import Link from "next/link";
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-12 px-4 border-b border-gray-200/50 backdrop-filter backdrop-blur-sm bg-gray-50 light:bg-gray-950">
      <div className="flex items-center space-x-4">
        {/* Logo and title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/qr1.png" alt="QUEERREADS Logo" width={40} height={40} />
          <span className="font-bold text-lg">QUEERREADS</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Navigation links */}
        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          Home
        </Link>
        <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          Search
        </Link>
        <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          About
        </Link>
      </div>
    </nav>
  );
}
