import React from 'react';

function Header(){
    return(
        <header className="bg-white shadow py-4 px-6 sm:px-8">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-semibold text-indigo-600">
          SmartExamGen
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="/pricing" className="text-gray-700 hover:text-indigo-600">Pricing</a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
          </div>
          <div className="md:hidden">
            {/* You can add a hamburger menu here for mobile */}
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-5h18V6H3v2z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

    )
}

export default Header