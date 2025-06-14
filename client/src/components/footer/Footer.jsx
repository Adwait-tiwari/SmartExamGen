import React from 'react';

function Footer(){
    return(
        <footer className="bg-gray-800 text-gray-300 py-6 px-6 sm:px-8">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Question Paper Generator App. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li><a href="/privacy" className="hover:text-gray-200">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-200">Terms of Service</a></li>
            <li><a href="/contact" className="hover:text-gray-200">Contact Us</a></li>
          </ul>
        </div>
      </footer>
    )
}

export default Footer