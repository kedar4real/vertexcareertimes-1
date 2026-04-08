const metrics = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'AICTE/NBA Accreditation',
    description: 'Check if the college has valid accreditation for quality assurance',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Placement Records',
    description: 'Verify average package, highest package, and percentage placed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Faculty Quality',
    description: 'Research faculty qualifications, student-teacher ratio',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Infrastructure',
    description: 'Labs, library, hostel facilities, and campus amenities',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Location & Connectivity',
    description: 'Proximity to IT hubs, transport links, and city facilities',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fee Structure',
    description: 'Total cost including tuition, hostel, and hidden charges',
  },
]

export default function CollegeMetrics() {
  return (
    <section id="predictors" className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Selection Criteria
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Key Metrics for Choosing the Right College
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {"Don't just look at the college name. Evaluate these critical factors to make an informed decision about your engineering career."}
            </p>

            <div className="grid gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{metric.title}</h3>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Quote Box */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white">
              <svg className="w-12 h-12 text-white/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-6">
                {"\"Choosing a college requires looking beyond cutoffs — factors like placements, faculty, and long-term career scope matter equally.\""}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  VT
                </div>
                <div>
                  <div className="font-semibold">Vertex Career Times</div>
                  <div className="text-sm text-white/80">Expert Counselling Team</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6 border border-border shadow-sm">
              <h4 className="font-semibold text-foreground mb-4">Quick College Comparison</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">COEP Pune</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="w-[95%] h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">VJTI Mumbai</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PICT Pune</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
