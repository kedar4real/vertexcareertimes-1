import React from 'react'
import Image from 'next/image'

export const metadata = {
    title: 'About Us - Vertex Career Times',
    description: 'Learn about our mission to simplify engineering admissions in Maharashtra.'
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#F8FAFC] border-b border-gray-100 py-20 lg:py-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-6 shadow-sm border border-blue-100">
                        About Our Organization
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
                        Pioneering Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Admission Guidance</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We bridge the gap between confusion and clarity for engineering aspirants. Vertex Career Times is dedicated to helping you secure the best branch and college based on your merit seamlessly.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
                        <div className="text-4xl font-extrabold text-blue-600 mb-2">9,500+</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Students Counselled</div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
                        <div className="text-4xl font-extrabold text-blue-600 mb-2">350+</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Colleges Indexed</div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
                        <div className="text-4xl font-extrabold text-blue-600 mb-2">12+</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Years Experience</div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
                        <div className="text-4xl font-extrabold text-blue-600 mb-2">99%</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Success Rate</div>
                    </div>
                </div>
            </div>

            {/* Story & Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
                            Our Vision
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Why We Started Vertex Career Times
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Every year, thousands of brilliant minds lose out on their dream colleges not because of low scores, but due to poor option form filing and lack of strategic awareness regarding CAP rounds.
                            </p>
                            <p>
                                We realized that students needed a data-driven, analytical approach to engineering admissions rather than relying on hearsay. That is exactly what Vertex Career Times provides: precise cutoff analyses and intelligent prioritization algorithms perfectly balanced with human empathy and 1-on-1 mentorship.
                            </p>
                            <p>
                                Our mission is to establish 100% transparency. We empower parents and students by giving them the exact statistics and historical records they need to make the biggest decision of their academic lives.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <div className="bg-gray-100 rounded-3xl aspect-[4/5] w-full overflow-hidden flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-3xl aspect-[4/5] w-full overflow-hidden flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-100 rounded-3xl aspect-[4/5] w-full overflow-hidden flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-3xl aspect-[4/5] w-full overflow-hidden flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
