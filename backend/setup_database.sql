-- Создание базы данных
CREATE DATABASE IF NOT EXISTS kostya;
USE kostya;

-- Таблица для пользователей (users) - оставляем без изменений
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

-- Таблица для студентов (students)
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    date_of_birth DATE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    photo_file_name VARCHAR(255)
);

-- Таблица для преподавателей (teachers)
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    department VARCHAR(255) NOT NULL,
    office_location VARCHAR(255),
    qualification VARCHAR(255),
    photo_file_name VARCHAR(255)
);