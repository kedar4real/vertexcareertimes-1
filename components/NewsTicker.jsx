export default function NewsTicker() {
  const newsItems = [
    "MHT-CET Updates & Important Dates",
    "CAP Round Option Form Deadlines Approaching",
    "JoSAA Registration Updates",
    "New Colleges Added to Database",
    "Free Webinar on Engineering Admissions This Week",
  ]

  return (
    <div className="bg-primary text-white py-2 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...newsItems, ...newsItems].map((item, index) => (
          <span key={index} className="inline-flex items-center mx-8">
            <span className="mr-2">🚨</span>
            <span className="text-sm font-medium">{item}</span>
            <span className="mx-8 text-blue-300">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
