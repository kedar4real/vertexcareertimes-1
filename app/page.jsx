import Header from '@/components/Header'
import NewsTicker from '@/components/NewsTicker'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import CommonMistakes from '@/components/CommonMistakes'
import CollegeMetrics from '@/components/CollegeMetrics'
import AdmissionTimeline from '@/components/AdmissionTimeline'
import TopColleges from '@/components/TopColleges'
import Experts from '@/components/Experts'
import Testimonials from '@/components/Testimonials'
import ComparisonTable from '@/components/ComparisonTable'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <CommonMistakes />
      <CollegeMetrics />
      <AdmissionTimeline />
      <TopColleges />
      <Experts />
      <Testimonials />
      <ComparisonTable />
      <Pricing />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
