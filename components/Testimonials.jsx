const testimonials = [
  {
    name: 'Student from Pune',
    review: 'Got clear guidance during CAP rounds and avoided common mistakes. The structured approach really helped.',
    rating: 5,
  },
  {
    name: 'Student from Mumbai',
    review: 'Helped me understand branch vs college selection properly. Made an informed decision instead of following the crowd.',
    rating: 5,
  },
  {
    name: 'Student from Nashik',
    review: 'Structured process made admission journey smooth and stress-free. The counsellor was available throughout CAP rounds.',
    rating: 5,
  },
  {
    name: 'Parent from Nagpur',
    review: 'Very professional and data-driven approach. They explained every option clearly and helped my son choose wisely.',
    rating: 5,
  },
  {
    name: 'Student from Kolhapur',
    review: 'The option form guidance was extremely helpful. Saved hours of confusion and research.',
    rating: 5,
  },
  {
    name: 'Parent from Aurangabad',
    review: 'Being from a small town, we had limited knowledge about engineering colleges. Vertex provided valuable insights.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Student Feedback
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            What Students & Parents Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear from students and parents who received structured guidance during their engineering admission journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-border shadow-sm hover-lift"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-4">
                {`"${testimonial.review}"`}
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">Verified Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
