-- Usage: mysql -u root -p < setup_mysql.sql

-- Drop the existing user if it exists
DROP USER IF EXISTS 'fitlife360'@'localhost';

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `fitlife360db`;

-- Create the user and grant privileges
CREATE USER 'fitlife360'@'localhost' IDENTIFIED BY 'fitlife360pwd';
GRANT ALL PRIVILEGES ON `fitlife360db`.* TO 'fitlife360'@'localhost';
FLUSH PRIVILEGES;
