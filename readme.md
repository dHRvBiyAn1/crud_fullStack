# Student CRUD Full-Stack Application

A modern, production-ready Student Management System built with **Java Spring Boot**, **Spring Security**, **Angular**, and **PostgreSQL**. This application demonstrates best practices in full-stack development including custom exception handling, DTOs, security, validation, and responsive UI design.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Design Patterns](#key-design-patterns)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Backend
- ✅ **Custom Exception Handling** - Centralized error handling with custom ErrorResponseDto (5 fields: message, statusCode, error, path, timestamp, fieldErrors)
- ✅ **Data Transfer Objects (DTOs)** - Separate DTOs for requests and responses
- ✅ **Builder Pattern & Constructor Injection** - Clean, testable code with Lombok
- ✅ **Password Encoding** - BCrypt password encoding for security
- ✅ **Unique Constraints** - Email and username uniqueness enforced at DB and service layer
- ✅ **Field Validation** - Comprehensive validation with custom error messages
- ✅ **CORS Configuration** - Properly configured CORS for frontend-backend communication
- ✅ **OOP Principles** - Service layer with interfaces for loose coupling
- ✅ **Transaction Management** - Transactional operations for data consistency

### Frontend
- ✅ **Modern, Responsive UI** - Minimalistic and mobile-friendly design
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete students
- ✅ **Form Validation** - Client-side validation with error messages
- ✅ **Password Management** - Eye button to toggle password visibility, confirm password field, masked password display
- ✅ **Serial Number Display** - Serial numbers in student list instead of IDs
- ✅ **Timestamp Display** - Shows both Created At and Updated At timestamps
- ✅ **Error Handling** - Displays backend error messages and field-level errors
- ✅ **Routing** - Separate pages for list, add, and edit operations
- ✅ **HTTP Client Integration** - Proper HTTP communication with error handling

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java 17+
- **Security:** Spring Security with BCrypt password encoding
- **ORM:** Spring Data JPA with Hibernate
- **Database:** PostgreSQL
- **Build Tool:** Maven
- **Libraries:** Lombok, Validation API

### Frontend
- **Framework:** Angular 18+
- **Language:** TypeScript
- **Styling:** CSS3 (Responsive)
- **HTTP Client:** Angular HttpClient
- **Build Tool:** Angular CLI

### Database
- **PostgreSQL** 12+

---

## 📦 Prerequisites

### System Requirements
- **Java:** JDK 17 or higher
- **Node.js:** v18 or higher
- **npm:** v9 or higher
- **PostgreSQL:** v12 or higher
- **Git:** For cloning the repository

### Tools (Optional but Recommended)
- **Postman:** For API testing
- **Visual Studio Code:** For frontend development
- **IntelliJ IDEA:** For backend development

---


## 🚀 Installation & Setup

### Backend Setup

#### 1. Database Setup

Create a PostgreSQL database:


#### 2. Clone/Create Backend Project

If cloning, navigate to backend directory
cd backend

Or create new Spring Boot project with Spring Boot CLI
spring boot new --type maven --name student-crud backend
cd backend


#### 3. Configure Database Connection

Update `src/main/resources/application.properties`:

Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

Server Configuration
server.port=8080


#### 4. Build Backend
cd crud-backend

./mvnw clean install

./mvnw spring-boot:run

#### 5. Start FrontEnd 
cd crud-frontend

npm install

ng serve