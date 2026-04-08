const mistakes = [
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    title: 'Ignoring Branch Preferences',
    description: 'Students often overlook their true interests while selecting branches, leading to regret later.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v4M12 15h.01" /></svg>,
    title: 'Chasing Only Brand Names',
    description: 'Focusing solely on college reputation without considering placement records and actual faculty quality.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
    title: 'Not Analyzing Cutoffs',
    description: 'Making decisions without studying historical cutoff data leads to poor choice ordering.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Ignoring Location Factors',
    description: 'Not considering hostel facilities, city living costs, commute options, and distance from home.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Last-Minute Option Form',
    description: 'Rushing through the CAP option form without proper intensive research and ordering logic.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'Overlooking Placements',
    description: 'Not verifying the actual placement statistics and the company profiles visiting the campus.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: 'Document Verification',
    description: 'Missing or incorrect category documents causing admission cancellation during physical verification.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    title: 'Wrong Quota Selection',
    description: 'Incorrect category, TFWS, or minority quota selection resulting in permanently missed seat opportunities.',
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Hidden Fee Surprises',
    description: 'Not accounting for the total costs including development fees, hostel, transport, and unexpected charges.',
  },
]

export default function CommonMistakes() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Crucial Awareness
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Common Mistakes Students Make
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learn from the mistakes of others. Our expert counsellors have identified the most
            frequent, critical errors students make during the engineering admission process.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {mistakes.map((mistake, index) => (
            <div
              key={index}
              className="bg-slate-50/50 rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              style={{ animationDelay: (index * 100) + 'ms' }}
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">
                {mistake.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                {mistake.title}
              </h3>
              <p className="text-[15px] text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {mistake.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <a
            href="#counselling"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Expert Guidance Now
            <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section >
  )
}
