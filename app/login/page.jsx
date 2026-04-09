'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')
  const [formData, setFormData] = useState({ mobile: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      window.location.href = '/' // hard refresh to update UI state
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 hover-lift">
      {registered && <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">Registration successful! Please log in.</div>}
      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Mobile Number</label>
          <input required type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" className="mt-1.5 block w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input required type="password" placeholder="••••••••" className="mt-1.5 block w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        
        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Forgot your password?
          </Link>
        </div>

        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-500 font-medium">New to Vertex?</span></div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/register" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Create a free account</Link>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16 pb-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Log in to manage your admission profile</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Suspense fallback={<div>Loading form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
