// Run: node seed_colleges.js
// Seeds the colleges table with Maharashtra engineering colleges.

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai",
    district: "Mumbai",
    type: "Government (IIT)",
    rating: 4.9,
    branches: ["CSE", "Electrical", "Mechanical", "Chemical", "Aerospace"],
    highlights: ["Top ranked in India", "World-class research", "Excellent placements"],
    established_year: 1958,
  },
  {
    name: "VNIT Nagpur",
    location: "Nagpur",
    district: "Nagpur",
    type: "Government (NIT)",
    rating: 4.8,
    branches: ["CSE", "ENTC", "Electrical", "Civil", "Mechanical"],
    highlights: ["NIT excellence", "Strong industry ties", "Quality education"],
    established_year: 1960,
  },
  {
    name: "ICT Mumbai",
    location: "Mumbai",
    district: "Mumbai",
    type: "Government",
    rating: 4.8,
    branches: ["Chemical", "Pharma", "Biotech", "Food Tech"],
    highlights: ["Specialized institute", "Research oriented", "Industry placements"],
    established_year: 1933,
  },
  {
    name: "COEP Technological University",
    location: "Pune",
    district: "Pune",
    type: "Government",
    rating: 4.8,
    branches: ["CSE", "AIML", "ENTC", "Mechanical", "Civil"],
    highlights: ["Strong placement reputation", "NBA Accredited", "Research focused"],
    established_year: 1854,
  },
  {
    name: "VJTI Mumbai",
    location: "Mumbai",
    district: "Mumbai",
    type: "Government",
    rating: 4.7,
    branches: ["CS", "IT", "Electronics", "Civil", "Mechanical"],
    highlights: ["Top recruiters visit", "Excellent infrastructure", "Industry connections"],
    established_year: 1887,
  },
  {
    name: "SPPU – Savitribai Phule Pune University",
    location: "Pune",
    district: "Pune",
    type: "Government",
    rating: 4.5,
    branches: ["CSE", "IT", "ENTC", "Mechanical", "Civil"],
    highlights: ["Prestigious university campus", "Strong alumni network", "Research culture"],
    established_year: 1949,
  },
  {
    name: "SPIT – Sardar Patel Institute of Technology",
    location: "Mumbai",
    district: "Mumbai",
    type: "Private (Autonomous)",
    rating: 4.6,
    branches: ["CSE", "IT", "EXTC", "Electrical"],
    highlights: ["Top private college in Mumbai", "Strong placements", "Active tech clubs"],
    established_year: 1962,
  },
  {
    name: "KJSCE – KJ Somaiya College of Engineering",
    location: "Mumbai",
    district: "Mumbai",
    type: "Private (Autonomous)",
    rating: 4.5,
    branches: ["CSE", "AIML", "IT", "EXTC", "Mechanical"],
    highlights: ["Autonomous institute", "Industry MoUs", "Hackathon culture"],
    established_year: 1983,
  },
  {
    name: "Walchand College of Engineering",
    location: "Sangli",
    district: "Sangli",
    type: "Government",
    rating: 4.6,
    branches: ["CSE", "Mechanical", "Civil", "Electrical", "Electronics"],
    highlights: ["Historic government institute", "Excellent faculty", "Strong placements"],
    established_year: 1947,
  },
  {
    name: "GCEK – Government College of Engineering Karad",
    location: "Karad",
    district: "Satara",
    type: "Government",
    rating: 4.3,
    branches: ["CSE", "Mechanical", "Civil", "Electrical"],
    highlights: ["Affordable fees", "Government aided", "Growing placements"],
    established_year: 1960,
  },
  {
    name: "PICT – Pune Institute of Computer Technology",
    location: "Pune",
    district: "Pune",
    type: "Private (Autonomous)",
    rating: 4.7,
    branches: ["CSE", "IT", "ENTC"],
    highlights: ["Top CS college in Pune", "95%+ placement rate", "Strong coding culture"],
    established_year: 1983,
  },
  {
    name: "GCOE Amravati – Government College of Engineering",
    location: "Amravati",
    district: "Amravati",
    type: "Government",
    rating: 4.3,
    branches: ["CSE", "Electrical", "Mechanical", "Civil"],
    highlights: ["Government aided", "Affordable fees", "Good faculty"],
    established_year: 1963,
  },
  {
    name: "SGGSIE&T Nanded",
    location: "Nanded",
    district: "Nanded",
    type: "Government (Deemed)",
    rating: 4.4,
    branches: ["CSE", "IT", "ENTC", "Mechanical", "Civil"],
    highlights: ["Deemed university status", "Research oriented", "Decent placements"],
    established_year: 1981,
  },
  {
    name: "MIT College of Engineering",
    location: "Pune",
    district: "Pune",
    type: "Private (Autonomous)",
    rating: 4.5,
    branches: ["CSE", "AIML", "IT", "Mechanical", "Civil", "ENTC"],
    highlights: ["Large campus", "Strong industry ties", "Entrepreneurship cell"],
    established_year: 1983,
  },
  {
    name: "DY Patil College of Engineering",
    location: "Pune",
    district: "Pune",
    type: "Private",
    rating: 4.2,
    branches: ["CSE", "IT", "Mechanical", "Civil", "ENTC"],
    highlights: ["Modern infrastructure", "Good hostel facilities", "Industry projects"],
    established_year: 1984,
  },
  {
    name: "Symbiosis Institute of Technology",
    location: "Pune",
    district: "Pune",
    type: "Private (Deemed)",
    rating: 4.5,
    branches: ["CSE", "AIML", "IT", "Mechanical", "Civil"],
    highlights: ["Symbiosis group", "International collaborations", "Top placements"],
    established_year: 2008,
  },
  {
    name: "GCOE Nagpur – Government College of Engineering",
    location: "Nagpur",
    district: "Nagpur",
    type: "Government",
    rating: 4.4,
    branches: ["CSE", "IT", "Electrical", "Mechanical", "Civil"],
    highlights: ["Government aided", "Strong alumni", "Affordable fees"],
    established_year: 1960,
  },
  {
    name: "Vidyalankar Institute of Technology",
    location: "Mumbai",
    district: "Mumbai",
    type: "Private (Autonomous)",
    rating: 4.3,
    branches: ["CSE", "IT", "EXTC", "Mechanical"],
    highlights: ["Autonomous status", "Good placement cell", "Active student life"],
    established_year: 1994,
  },
  {
    name: "Fr. Conceicao Rodrigues College of Engineering",
    location: "Mumbai",
    district: "Mumbai",
    type: "Private (Aided)",
    rating: 4.4,
    branches: ["CSE", "IT", "EXTC", "Mechanical", "Civil"],
    highlights: ["Aided minority institute", "Good placements", "Reputed faculty"],
    established_year: 1984,
  },
  {
    name: "PREC – Pune Rural Engineering College",
    location: "Loni",
    district: "Ahmednagar",
    type: "Private (Aided)",
    rating: 4.1,
    branches: ["CSE", "Mechanical", "Civil", "Electrical"],
    highlights: ["Affordable fees", "Good infrastructure", "Rural area campus"],
    established_year: 1983,
  },
];

async function seed() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    for (const college of colleges) {
      await pool.execute(
        `INSERT IGNORE INTO colleges (name, location, district, type, rating, branches, highlights, established_year)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          college.name,
          college.location,
          college.district,
          college.type,
          college.rating,
          JSON.stringify(college.branches),
          JSON.stringify(college.highlights),
          college.established_year,
        ]
      );
      console.log(`Inserted: ${college.name}`);
    }
    console.log(`\nDone. ${colleges.length} colleges seeded.`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await pool.end();
  }
}

seed();
