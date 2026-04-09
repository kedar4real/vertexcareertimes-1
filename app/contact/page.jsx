'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send message')
      
      setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' })
      setFormData({ name: '', subject: '', message: '' }) // Clear form
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 animate-fade-in-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">We're here to answer all your admission-related queries.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover-lift" style={{ animationDelay: '0.1s' }}>
          <div className="px-6 py-8 sm:p-10">
            {status && (
              <div className={`mb-6 p-4 rounded-lg font-medium text-sm border ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                <input required type="text" className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700">Subject</label>
                <input required type="text" className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="What is this regarding?" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700">Message</label>
                <textarea required rows={5} className="mt-2 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" />
              </div>

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5">
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 px-6 py-6 border-t border-gray-100 sm:px-10 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center text-sm font-medium text-gray-600">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" clipRule="evenodd" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@vertexcareertimes.com
            </div>
            <div className="mt-4 sm:mt-0 flex items-center text-sm font-medium text-gray-600">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +91 75881 86264
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
