import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">About Vertex Career Times</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto font-medium">Maharashtra's Most Trusted Engineering Admission Guidance Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded with the vision to simplify the complex engineering admission process, Vertex Career Times has guided over 9,500 students across Maharashtra into their dream colleges. We believe that every student deserves transparent, data-backed guidance to navigate the CAP rounds successfully.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our expert counsellors come with 5+ years of dedicated experience in MHT-CET, JEE Main, and Diploma to Degree (DSE) admissions, ensuring you have the edge you need during option form filling.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-lg hover-lift relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
             <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-blue-600 rounded-full opacity-10"></div>
             
             <ul className="space-y-6 relative z-10">
               <li className="flex items-start">
                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">9.5k+</div>
                 <p className="ml-4 text-lg leading-6 font-semibold text-gray-900 pt-3">Students Guided</p>
               </li>
               <li className="flex items-start">
                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">350+</div>
                 <p className="ml-4 text-lg leading-6 font-semibold text-gray-900 pt-3">Colleges Covered</p>
               </li>
               <li className="flex items-start">
                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">5+</div>
                 <p className="ml-4 text-lg leading-6 font-semibold text-gray-900 pt-3">Years of Experience</p>
               </li>
             </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 mb-16 text-center animate-fade-in-up border border-gray-100" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover-lift transition-transform">
               <h3 className="text-xl font-bold text-blue-700 mb-3">Data-Driven Approach</h3>
               <p className="text-gray-600">We analyze past cutoffs, seat matrices, and emerging trends to build your optimal college list.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover-lift transition-transform">
               <h3 className="text-xl font-bold text-blue-700 mb-3">Personalized Sessions</h3>
               <p className="text-gray-600">No generic advice. One-on-one sessions tailored specifically to your percentile, category, and preferred branches.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover-lift transition-transform">
               <h3 className="text-xl font-bold text-blue-700 mb-3">Complete Handholding</h3>
               <p className="text-gray-600">From document verification issues to freeze/float decisions in CAP rounds, we are with you till admission.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
