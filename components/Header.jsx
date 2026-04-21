'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import NewsTicker from './NewsTicker'

const mainLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'MHT-CET Engineering', href: '/#mhtcet' },
  { label: 'Diploma to Engg (DSE)', href: '/#dse' },
  { label: 'All India (JEE/JoSAA)', href: '/#jee' },
]

const serviceLinks = [
  { label: 'CAP Predictor', href: '/cap-predictor', highlight: true },
  { label: 'Premium Counselling', href: '/#counselling', highlight: true },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md border-b-0' : 'border-b border-gray-100'}`}>

      {/* Top Bar: Logo, Nav, & CTA */}
      <div className="max-w-[90rem] mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-blue-50 p-1 group-hover:bg-blue-100 transition-colors">
            <img src="/logo.png" alt="Vertex Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl lg:text-lg xl:text-xl tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">
              Vertex Career Times
            </h1>
            <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest leading-none">Admission Guidance</span>
          </div>
        </Link>

        {/* Desktop Navigation - Centered Two Rows */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 px-4">
          {/* Row 1: Academic Paths */}
          <div className="flex justify-center gap-5 xl:gap-8 py-0.5">
            {mainLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-[13px] xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </div>

          {/* Row 2: Services / Premium Tools */}
          <div className="flex justify-center gap-4 py-0.5 mt-0.5">
            {serviceLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-[13px] xl:text-sm font-medium transition-all px-3 py-1 rounded-full flex items-center gap-1.5 ${item.highlight
                  ? 'bg-blue-100/50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/login" className="text-sm xl:text-base text-gray-600 font-medium hover:text-blue-600 transition-colors px-2">
            Login
          </Link>
          <Link href="/register" className="text-sm xl:text-base bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-0.5">
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
        <div className="px-4 pt-2 pb-6 space-y-6 flex flex-col h-[calc(100vh-80px)] overflow-y-auto">

          <div className="space-y-1 pt-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Admission Paths</div>
            {mainLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-3 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1 border-t border-gray-100 pt-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Student Services</div>
            {serviceLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`block px-4 py-3 text-base font-semibold rounded-xl transition-colors flex items-center justify-between ${item.highlight
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-800 hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
                {item.highlight && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">POPULAR</span>}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 mt-auto border-t border-gray-100">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3.5 text-base font-bold text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Login to Account
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-colors">
              Register Now
            </Link>
          </div>

        </div>
      </div>

      {/* Integrated News Ticker */}
      <div className="border-t border-blue-700/10">
        <NewsTicker />
      </div>

    </header>
  )
}
