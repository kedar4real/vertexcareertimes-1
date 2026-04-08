const steps = [
  {
    step: '01',
    title: 'Exam Registration',
    description: 'Register for MHT-CET, JEE Main, or relevant entrance exams',
    month: 'Jan-Feb',
  },
  {
    step: '02',
    title: 'Appear for Exam',
    description: 'Take the entrance examination and wait for results',
    month: 'April-May',
  },
  {
    step: '03',
    title: 'Result & Percentile',
    description: 'Check your percentile score and analyze your position',
    month: 'June',
  },
  {
    step: '04',
    title: 'CAP Registration',
    description: 'Register for Centralized Admission Process online',
    month: 'June-July',
  },
  {
    step: '05',
    title: 'Document Verification',
    description: 'Submit and verify all required documents at FC',
    month: 'July',
  },
  {
    step: '06',
    title: 'Option Form Filling',
    description: 'Fill college and branch preferences strategically',
    month: 'July-Aug',
  },
  {
    step: '07',
    title: 'Seat Allotment',
    description: 'Accept allotted seat and complete admission formalities',
    month: 'Aug-Sept',
  },
]

export default function AdmissionTimeline() {
  return (
    <section id="timeline" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Step by Step Guide
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Engineering Admission Timeline
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Follow this comprehensive timeline to ensure you never miss an important deadline
            during your engineering admission journey.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 w-full h-1 bg-border">
              <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: '100%' }}></div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-7 gap-4">
              {steps.map((item, index) => (
                <div key={index} className="relative pt-16 text-center">
                  {/* Circle */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                    {index + 1}
                  </div>
                  {/* Content */}
                  <div className="bg-secondary rounded-xl p-4 hover:bg-primary/5 transition-colors">
                    <div className="text-xs font-medium text-primary mb-2">{item.month}</div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-0 left-4 w-0.5 h-full bg-primary/20"></div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Circle */}
                  <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  {/* Content */}
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.month}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#counselling"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-blue-700 transition-colors"
          >
            Get Timeline Reminders
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
