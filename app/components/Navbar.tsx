import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link href="/" className="flex items-center">
            {/* SVG Logo here */}
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="">
            
            </svg>
            <span className="font-semibold text-xl tracking-tight">On Track</span>
        </Link>
      </div>
      {/* Mobile menu button here */}
      {/* ... */}
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="./daily-practice" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-fuchsia-500 mr-4">
              Daily Practice
          </Link>
          <Link href="./Goals" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
              My Goals
          </Link>
          <Link href="./monthly-reflections" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white">
              Reflections
          </Link>
        </div>
      </div>
    </nav>
  );
}
