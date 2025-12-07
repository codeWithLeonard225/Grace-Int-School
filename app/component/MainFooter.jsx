// app/components/MainFooter.js

import Link from 'next/link';
import Image from 'next/image';

// Assuming social icons are available, e.g., using Lucide or Heroicons

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/policy' },
  { name: 'Terms of Use', href: '/terms' },
];

export default function MainFooter() {
  // Current year for the copyright notice
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="bg-blue-900 text-white pt-10 pb-4 shadow-2xl mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Logo, Links, and Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-blue-700 pb-8">
          
          {/* Column 1: Branding & Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/grace.jpg"
                  alt="Grace International School Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-2xl font-bold tracking-wider">
                Grace IS
              </span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Excellence in education since 2005. Building future leaders in Sierra Leone.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-green-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>📍 Freetown, Sierra Leone</p>
              <p>📞 (+232) 76 XXX XXX</p>
              <p>📧 info@graceis.sl</p>
            </address>
          </div>

          {/* Column 4: Social Media (Placeholder) */}
          <div>
             <h3 className="text-lg font-semibold mb-4 text-green-400">Follow Us</h3>
             <div className="flex space-x-3">
                <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-green-400 transition">
                    {/* Placeholder for Facebook icon */}
                    <span className="text-2xl">📘</span> 
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-green-400 transition">
                    {/* Placeholder for Twitter icon */}
                    <span className="text-2xl">🐦</span> 
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-green-400 transition">
                    {/* Placeholder for Instagram icon */}
                    <span className="text-2xl">📸</span> 
                </a>
             </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Grace International School. All rights reserved.</p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
             {legalLinks.map((link) => (
                <li key={link.name}>
                    <Link href={link.href} className="hover:text-green-400 transition">
                        {link.name}
                    </Link>
                </li>
             ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}