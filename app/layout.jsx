import { Inter } from 'next/font/google'
import './globals.css'
import FloatingButtons from '@/components/FloatingButtons'
import GoogleTranslate from '@/components/GoogleTranslate'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Vertex Career Times - Maharashtra\'s #1 Engineering Admission Counselling',
  description: 'Expert guidance for MHT-CET, JEE Main, and Diploma to Engineering admissions. Get personalized counselling, college predictions, and CAP round support from Maharashtra\'s most trusted admission counselling platform.',
  keywords: 'MHT-CET counselling, engineering admission, JEE counselling, college predictor, Maharashtra engineering colleges, CAP round, COEP, VJTI, admission guidance',
  authors: [{ name: 'Vertex Career Times' }],
  openGraph: {
    title: 'Vertex Career Times - Maharashtra\'s #1 Engineering Admission Counselling',
    description: 'Expert guidance for MHT-CET, JEE Main, and Diploma to Engineering admissions.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vertex Career Times',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertex Career Times - Engineering Admission Counselling',
    description: 'Expert guidance for MHT-CET, JEE Main, and Diploma to Engineering admissions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563EB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <FloatingButtons />
        <GoogleTranslate />
      </body>
    </html>
  )
}
