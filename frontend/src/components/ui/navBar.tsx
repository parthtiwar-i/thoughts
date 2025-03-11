'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Avatar from './userAvatar'
import { useAuth } from '../../context'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-10 bg-orange-100 font-mono shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-orange-800 text-xl font-bold">
              Thoughts
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/blogs">Blogs</NavLink>
              <NavLink to="/publish">Publish</NavLink>
              {user ? (
                <Link to="/profile" className="inline-block">
                  <Avatar name={user.name} />
                </Link>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-orange-800 hover:text-orange-900 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/blogs" mobile>Blogs</NavLink>
            <NavLink to="/publish" mobile>Publish</NavLink>
            {user ? (
              <Link to="/profile" className="block px-3 py-2 text-base font-medium text-orange-800 hover:text-orange-900 hover:bg-orange-200">
                <Avatar name={user.name} />
              </Link>
            ) : (
              <NavLink to="/login" mobile>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

interface NavLinkProps {
  to: string
  children: React.ReactNode
  mobile?: boolean
}

function NavLink({ to, children, mobile = false }: NavLinkProps) {
  const baseClasses = "text-orange-800 hover:text-orange-900 hover:bg-orange-200 transition-colors duration-200"
  const desktopClasses = "px-3 py-2 rounded-md text-sm font-medium"
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium"

  return (
    <Link
      to={to}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  )
}