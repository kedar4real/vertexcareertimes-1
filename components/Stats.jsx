'use client'

import { useEffect, useState, useRef } from 'react'

const stats = [
  { label: 'Students Guided', value: 9500, suffix: '+' },
  { label: 'Colleges Tracked', value: 372, suffix: '+' },
  { label: 'Years of Cutoff & Admission Data', value: 5, suffix: ' Years' },
]

const chartData = [
  { label: 'Pune District', value: 70, color: '#2563EB', lightColor: '#3B82F6' },
  { label: 'Mumbai, Thane, Palghar', value: 60, color: '#10B981', lightColor: '#34D399' },
  { label: 'Rest of Maharashtra', value: 242, color: '#F59E0B', lightColor: '#FBBF24' },
]

const totalColleges = chartData.reduce((sum, item) => sum + item.value, 0)

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [hoveredSegment, setHoveredSegment] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 0.3) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  // Calculate pie chart segments with conic gradients
  let cumulativePercentage = 0
  const segments = chartData.map((item) => {
    const percentage = (item.value / totalColleges) * 100
    const segment = {
      ...item,
      percentage,
      startAngle: cumulativePercentage * 3.6,
      endAngle: (cumulativePercentage + percentage) * 3.6,
    }
    cumulativePercentage += percentage
    return segment
  })

  // Create conic gradient string
  const conicGradient = segments
    .map((segment, index) => {
      const prevEnd = index === 0 ? 0 : segments.slice(0, index).reduce((sum, s) => sum + s.percentage, 0)
      const end = prevEnd + segment.percentage
      return `${segment.color} ${prevEnd}% ${end}%`
    })
    .join(', ')

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Trusted by Thousands of Students Across Maharashtra
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our comprehensive database and expert guidance have helped students make 
              informed decisions for engineering admissions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border hover-lift"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    {isVisible ? stat.value : 0}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Animated Pie Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-foreground mb-2 text-center">College Distribution</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center">Total Colleges: {totalColleges}+</p>
            
            {/* 3D Pie Chart Container */}
            <div 
              className="relative"
              style={{ perspective: '800px' }}
            >
              {/* 3D Pie Chart */}
              <div 
                className="relative w-64 h-64 transition-transform duration-300"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(55deg) rotateZ(${rotation}deg)`,
                }}
              >
                {/* Main pie face */}
                <div 
                  className="absolute inset-0 rounded-full shadow-2xl transition-all duration-1000"
                  style={{ 
                    background: isVisible ? `conic-gradient(${conicGradient})` : '#E2E8F0',
                    transform: 'translateZ(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
                
                {/* 3D depth layers */}
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 rounded-full transition-all duration-1000"
                    style={{ 
                      background: isVisible ? `conic-gradient(${segments.map((s, idx) => {
                        const prevEnd = idx === 0 ? 0 : segments.slice(0, idx).reduce((sum, seg) => sum + seg.percentage, 0)
                        const end = prevEnd + s.percentage
                        const darkenedColor = s.color.replace('#', '')
                        const r = Math.max(0, parseInt(darkenedColor.substr(0, 2), 16) - 30)
                        const g = Math.max(0, parseInt(darkenedColor.substr(2, 2), 16) - 30)
                        const b = Math.max(0, parseInt(darkenedColor.substr(4, 2), 16) - 30)
                        return `rgb(${r}, ${g}, ${b}) ${prevEnd}% ${end}%`
                      }).join(', ')})` : '#CBD5E1',
                      transform: `translateZ(${18 - i * 2.5}px)`,
                    }}
                  />
                ))}
                
                {/* Bottom shadow layer */}
                <div 
                  className="absolute inset-2 rounded-full"
                  style={{ 
                    background: 'rgba(0,0,0,0.2)',
                    transform: 'translateZ(-5px)',
                    filter: 'blur(10px)',
                  }}
                />
              </div>

              {/* Center label (fixed, not rotating) */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transform: 'translateY(-20px)' }}
              >
                <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border border-gray-100">
                  <span className="text-2xl font-bold text-foreground">{totalColleges}+</span>
                  <span className="text-xs text-muted-foreground">Colleges</span>
                </div>
              </div>
            </div>

            {/* Legend Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-lg">
              {segments.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl p-4 shadow-sm border border-border transition-all duration-300 cursor-pointer ${
                    hoveredSegment === index ? 'scale-105 shadow-md' : ''
                  }`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{item.value}+</div>
                  <div className="text-xs text-muted-foreground leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
