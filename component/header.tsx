"use client"; // Required for useState (to toggle the mobile menu)

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  Tag,
  Menu, // Hamburger icon
  X,      // Close icon
} from 'lucide-react';

const Header = () => {
  // State to manage the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'SHOP', href: '/#' },
    { name: 'SKILLS', href: '/#' },
    { name: 'STORIES', href: '/#' },
    { name: 'ABOUT', href: '/#' },
    { name: 'CONTACT US', href: '#' },
  ];

  // Icons for the mobile menu
  const mobileActionIcons = [
    { name: 'Wishlist', href: '/wishlist', icon: <Heart size={24} strokeWidth={1.5} /> },
    { name: 'Search', href: '/search', icon: <Search size={24} strokeWidth={1.5} /> },
    { name: 'Account', href: '/account', icon: <User size={24} strokeWidth={1.5} /> },
  ];

  return (
    <header className="w-full bg-white text-black relative">
      {/* 1. Announcement Bar */}
      <div className="bg-black text-pink-500 py-2.5">
        <div className="max-w-[1248px] mx-auto flex justify-center items-center px-4">
          {/* On mobile, show only one */}
          <div className="flex md:hidden items-center space-x-2 text-sm">
            <Tag size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          {/* On desktop, show all three */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <Tag size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm ml-16">
            <Tag size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2 text-sm ml-16">
            <Tag size={16} />
            <span>Lorem ipsum dolor</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-[1248px] mx-auto px-4">
          
          {/* --- DESKTOP NAV (Visible > md) --- */}
          <div className="hidden md:grid md:grid-cols-3 items-center py-6">
            {/* Left: Custom Logo Icon */}
            <div className="justify-self-start">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Shop Logo"
                  width={32}
                  height={32}
                />
              </Link>
            </div>

            {/* Center: Main Logo Text */}
            <div className="justify-self-center">
              <Link href="/" className="text-4xl font-extrabold tracking-wider">
                LOGO
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="justify-self-end">
              <div className="flex items-center space-x-4">
                <button className="hover:text-gray-700" aria-label="Search">
                  <Search size={24} strokeWidth={1.5} />
                </button>
                <button className="hover:text-gray-700" aria-label="Wishlist">
                  <Heart size={24} strokeWidth={1.5} />
                </button>
                <button className="hover:text-gray-700" aria-label="Cart">
                  <ShoppingBag size={24} strokeWidth={1.5} />
                </button>
                <button className="hover:text-gray-700" aria-label="Account">
                  <User size={24} strokeWidth={1.5} />
                </button>
                <button className="flex items-center hover:text-gray-700">
                  <span>ENG</span>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* --- MOBILE NAV (Visible < md) --- */}
          <div className="flex md:hidden items-center justify-between py-5">
            {/* Left: Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="z-50"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Center: Main Logo Text */}
            <Link href="/" className="text-3xl font-extrabold tracking-wider">
              LOGO
            </Link>

            {/* Right: Cart Icon */}
            <button className="hover:text-gray-700" aria-label="Cart">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* 2b. Bottom Row: Nav Links (Desktop) */}
          <div className="hidden md:flex justify-center items-center space-x-8 lg:space-x-12 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU (Flyout) --- */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 p-5">
          <nav className="flex flex-col space-y-5">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium uppercase"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {link.name}
              </Link>
            ))}
            
            <hr className="border-gray-200" />
            
            {/* Action Icons */}
            {mobileActionIcons.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Language */}
            <button className="flex items-center gap-3 text-lg font-medium">
              <span>ENG</span>
              <ChevronDown size={20} strokeWidth={1.5} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;