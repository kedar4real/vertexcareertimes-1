export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-16 pb-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start text-left w-full">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Guided 9500+ Students Across Maharashtra
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight text-balance">
              Engineering Admission <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Guidance Platform</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              Make informed decisions for MHT-CET, JEE, and Diploma to Engineering admissions with structured guidance, data insights, and expert counselling.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#counselling"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 w-full sm:w-auto group"
              >
                Check Your College
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              {[
                { label: '5+ Years Experience' },
                { label: 'Data-Driven Insights' },
                { label: 'Expert Counsellors' }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration: The Bridge Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">

            <style>{`
              @keyframes zoomBounce {
                0%, 100% { transform: scale(1) translateY(0); box-shadow: 0 0 25px rgba(59, 130, 246, 0.15); }
                50% { transform: scale(1.03) translateY(-10px); box-shadow: 0 15px 45px rgba(59, 130, 246, 0.4); }
              }
              .animate-hero-img {
                animation: zoomBounce 5s ease-in-out infinite;
              }
            `}</style>

            <div className="relative w-full h-full max-w-xl mx-auto flex items-center justify-center p-4">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-indigo-100/50 rounded-[40px] border border-white shadow-xl opacity-60"></div>

              {/* The Image */}
              <img
                src="/hero-bridge.png"
                alt="Engineering Admission Bridge - From Percentile to Top Tier College"
                className="relative w-full h-auto max-h-full object-contain rounded-2xl animate-hero-img border-8 border-white/90 z-10"
              />

              {/* Floor blur shadow */}
              <div className="absolute inset-x-12 -bottom-2 h-6 bg-blue-500/20 blur-xl rounded-full z-0"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
