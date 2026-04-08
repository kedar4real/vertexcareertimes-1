const experts = [
  {
    name: 'Baswaraj S. Mashalkar',
    role: 'Lead Admission Counsellor',
    experience: '9+ Years',
    education: 'B.Tech & M.Tech, Walchand College',
    specialization: 'MHT-CET & JEE Counselling',
    description: 'Expert in guiding students through CAP rounds and engineering admission process with data-driven insights.',
  },
  {
    name: 'Akshay Dhodmise',
    role: 'Academic Expert',
    experience: '7+ Years',
    education: 'B.Tech & M.Tech, Walchand College',
    specialization: 'Diploma to Engineering (DSE)',
    description: 'Specializes in helping diploma students navigate direct second year admissions with optimal college choices.',
  },
]

export default function Experts() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Meet Our Expert Counsellors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our experienced team provides structured guidance with data-driven insights
            to help students make informed decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover-lift"
            >
              <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {expert.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{expert.name}</h3>
                    <p className="text-white/80 text-sm">{expert.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {expert.experience}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {expert.education}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-1">Specialization</h4>
                  <p className="text-sm text-primary">{expert.specialization}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {expert.description}
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/917588186264"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-blue-700 transition-colors text-center"
                  >
                    Book Session
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
