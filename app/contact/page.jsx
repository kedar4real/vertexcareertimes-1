import React from 'react'

export const metadata = {
    title: 'Contact Us - Vertex Career Times',
    description: 'Get in touch with our expert admission counsellors.'
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
                        Reach Out Safely
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Contact Our Experts
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions about MHT-CET, CAP rounds, or branch selection? Our expert counselling team is here to assist you every step of the way.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We respond to all inquiries within 24 hours. For immediate assistance during active CAP rounds, please call our admission hotline.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Direct Contact</h3>
                                    <p className="text-gray-600 mt-1"><a href="tel:+917588186264" className="hover:text-blue-600 transition-colors">+91 75881 86264</a></p>
                                    <p className="text-gray-600"><a href="tel:+918999356450" className="hover:text-blue-600 transition-colors">+91 89993 56450</a></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600 mt-1">support@vertexcareertimes.com</p>
                                    <p className="text-sm text-gray-500 mt-1">For general inquiries and academic documents.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Our Office</h3>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        Vertex Educational Counseling,<br />
                                        Pune, Maharashtra, India.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
                            <h3 className="font-bold text-gray-900 mb-4">Support Hours</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span>Monday - Friday</span>
                                    <span className="font-medium text-gray-900">10:00 AM - 7:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span>Saturday</span>
                                    <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                                </li>
                                <li className="flex justify-between pt-1">
                                    <span>Sunday</span>
                                    <span className="font-medium text-red-500">During CAP Rounds Only</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                        <form className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Provide WhatsApp No."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">Subject / Inquiry Type</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                >
                                    <option value="cap-guidance">CAP Routine Guidance</option>
                                    <option value="direct-second-year">Direct Second Year (DSE)</option>
                                    <option value="nri-quota">NRI / Management Quota</option>
                                    <option value="other">Other Queries</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 mt-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg shadow-blue-500/30 text-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
