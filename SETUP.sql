-- Vertex Career Times Database Setup for Hostinger MySQL

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  district VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS colleges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.0,
  branches JSON NOT NULL,
  highlights JSON NOT NULL,
  established_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Note: In Hostinger hPanel, create the MySQL Database, User, and Set Password.
-- Then go to phpMyAdmin and execute this SQL query inside the new database.
-- Update the root .env file with your credentials:
-- DB_HOST=localhost
-- DB_USER=your_db_username
-- DB_PASSWORD=your_db_password
-- DB_NAME=your_db_name
