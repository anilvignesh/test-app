'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Wallet, Home, LogOut, LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">Card Genie</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>All Cards</span>
            </Link>

            {session ? (
              <>
                <Link
                  href="/wallet"
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Wallet className="w-5 h-5" />
                  <span>My Wallet</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Hi, {session.user?.name || session.user?.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-purple-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>All Cards</span>
            </Link>

            {session ? (
              <>
                <Link
                  href="/wallet"
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Wallet className="w-5 h-5" />
                  <span>My Wallet</span>
                </Link>
                <div className="space-y-2">
                  <p className="text-gray-600">Hi, {session.user?.name || session.user?.email}</p>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
