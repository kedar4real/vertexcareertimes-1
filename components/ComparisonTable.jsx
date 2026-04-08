const features = [
  { name: 'College Database Access', vertex: true, free: true, others: true },
  { name: 'Basic Cutoff Information', vertex: true, free: true, others: true },
  { name: '5 Year Cutoff Trends', vertex: true, free: false, others: 'Partial' },
  { name: 'AI College Predictor', vertex: true, free: false, others: 'Basic' },
  { name: 'Option Form Helper', vertex: true, free: false, others: false },
  { name: 'Personal Counselling', vertex: true, free: false, others: 'Limited' },
  { name: '24/7 Support During CAP', vertex: true, free: false, others: false },
  { name: 'Document Checklist', vertex: true, free: false, others: true },
  { name: 'Seat Matrix Analysis', vertex: true, free: false, others: false },
  { name: 'Branch vs College Priority Guide', vertex: true, free: false, others: false },
  { name: 'WhatsApp Support Group', vertex: true, free: false, others: false },
  { name: 'Video Counselling Sessions', vertex: true, free: false, others: 'Paid Extra' },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

function renderCell(value) {
  if (value === true) return <CheckIcon />
  if (value === false) return <CrossIcon />
  return <span className="text-sm text-muted-foreground">{value}</span>
}

export default function ComparisonTable() {
  return (
    <section id="counselling" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Vertex vs Other Options
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Compare features across different guidance options to make an informed choice.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-4 font-semibold text-foreground">Features</th>
                <th className="p-4 font-semibold text-white bg-primary">
                  <div className="flex flex-col items-center">
                    <span>Vertex Career Times</span>
                    <span className="text-xs font-normal text-white/80">Recommended</span>
                  </div>
                </th>
                <th className="p-4 font-semibold text-foreground">Free Resources</th>
                <th className="p-4 font-semibold text-foreground">Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-secondary/50'}>
                  <td className="p-4 text-foreground">{feature.name}</td>
                  <td className="p-4 bg-primary/5">
                    <div className="flex justify-center">{renderCell(feature.vertex)}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">{renderCell(feature.free)}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">{renderCell(feature.others)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="bg-white rounded-xl border border-border p-4">
              <div className="font-medium text-foreground mb-3">{feature.name}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-primary/10 rounded-lg p-2">
                  <div className="text-xs text-muted-foreground mb-1">Vertex</div>
                  <div className="flex justify-center">{renderCell(feature.vertex)}</div>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <div className="text-xs text-muted-foreground mb-1">Free</div>
                  <div className="flex justify-center">{renderCell(feature.free)}</div>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <div className="text-xs text-muted-foreground mb-1">Others</div>
                  <div className="flex justify-center">{renderCell(feature.others)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
          >
            Get Started with Vertex
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
