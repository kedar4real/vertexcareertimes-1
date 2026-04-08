import Link from 'next/link'

export const metadata = {
    title: 'Register - Vertex Career Times',
    description: 'Create your Vertex Career Times student account.',
}

export default function RegisterPage() {
    return (
        <div className="min-h-[calc(100vh-140px)] bg-[#F8FAFC] flex items-center justify-center p-4 py-12">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row-reverse">

                {/* Right Side: Brand/Info */}
                <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-700 to-indigo-900 p-10 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl translate-y-1/3 translate-x-1/4"></div>

                    <div className="relative z-10">
                        <Link href="/" className="inline-block mb-12">
                            <span className="text-2xl font-bold tracking-tight">Vertex Career Times</span>
                        </Link>
                        <h2 className="text-3xl font-bold mb-4 leading-tight">Start Your Engineering Journey</h2>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Create an account to track cutoffs, accurately predict colleges, and receive expert admission guidance directly on your dashboard.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-indigo-800 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-50">Trusted by over 9,500 students</span>
                        </div>
                    </div>
                </div>

                {/* Left Side: Register Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 relative">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
                        <p className="text-gray-500 text-sm">Join the platform to access premium admission tools.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+91 00000 00000"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="flex items-start mt-4 mb-6">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 cursor-pointer leading-tight">
                                I agree to the <Link href="#" className="font-semibold text-blue-600 hover:text-blue-700">Terms of Service</Link> and <Link href="#" className="font-semibold text-blue-600 hover:text-blue-700">Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg shadow-blue-500/30 mt-2"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
                            Sign in Instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
