import Link from 'next/link'

export const metadata = {
    title: 'Login - Vertex Career Times',
    description: 'Login to your Vertex Career Times student portal.',
}

export default function LoginPage() {
    return (
        <div className="min-h-[calc(100vh-140px)] bg-[#F8FAFC] flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                {/* Left Side: Brand/Info */}
                <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="relative z-10">
                        <Link href="/" className="inline-block mb-12">
                            <span className="text-2xl font-bold tracking-tight">Vertex Career Times</span>
                        </Link>
                        <h2 className="text-3xl font-bold mb-4 leading-tight">Welcome Back to Your Portal</h2>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Track your CAP options, access premium predictors, and connect with your counsellor instantly.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-50">Join 9,500+ students</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 relative">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h1>
                        <p className="text-gray-500 text-sm">Please sign in to access your dashboard.</p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <Link href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg shadow-blue-500/30"
                        >
                            Sign in to Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
