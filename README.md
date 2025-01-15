# Hotel Booking App
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](link-to-build) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description
A comprehensive hotel booking platform built with Next.js 14, React.js, TypeScript, and Tailwind CSS. Users can seamlessly browse and book hotels, complete secure payments, and manage their bookings. Key features include automated email receipts, downloadable receipts, and a review system for booked hotels. Hotel owners can efficiently manage their listings with options to create, edit, and delete hotels. The app ensures secure authentication and role-based authorization using Auth.js and leverages MongoDB for robust data management.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)

## Features
### User Features  
- **Hotel Booking**  
  Effortlessly browse and book available hotels with a user-friendly interface.  
- **Payment Processing**  
  Complete secure payments and receive instant booking confirmation.  
- **Email Receipts**  
  Automatically receive booking receipts via email for easy record-keeping.  
- **Downloadable Receipts**  
  Access and download receipts directly from the platform.  
- **Review System**  
  Share feedback by leaving star-based reviews for hotels you have booked.  

### Owner Features  
- **Hotel Management**  
  Create, edit, and delete hotel listings with intuitive tools.  
- **Review Restriction**  
  Owners are restricted from reviewing their own hotels, ensuring unbiased feedback.  

### Authentication and Security  
- **Secure Login**  
  Robust authentication and authorization powered by Auth.js.  
- **Role-Based Access**  
  Separate functionality for users and hotel owners.  

### Data Management  
- **Scalable Database**  
  MongoDB ensures efficient storage and retrieval of data.


## Technologies  

### Frontend  
- **Next.js 14**: A React-based framework for building fast, user-friendly web applications.  
- **React.js**: A JavaScript library for building user interfaces.  
- **TypeScript**: A statically typed superset of JavaScript to improve code quality and maintainability.  
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without writing custom CSS.  

### Validation  
- **React Hook Form**: A library for handling form validation in React with minimal re-renders.  
- **Zod**: A TypeScript-first schema declaration and validation library used for form and data validation.  

### Backend and Database  
- **MongoDB**: A NoSQL database used for storing user, hotel, and booking data.  

### Authentication  
- **Auth.js**: A complete open-source authentication solution for handling secure login and role-based authorization.  

### Email Service  
- **SMTP**: Used for sending email receipts to users after successful bookings.  




## Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/username/project-name.git](https://github.com/Hasibul-Islam-Shanto/hotel-booking.git
2. Go to project folder:
   ```bash
   cd project-name
3. Installation :
   ```bash
   npm install
4. Clone the repository:
   ```bash
   npm run dev
5. For production build and run:
   ```bash
   npm run build
   npm start


## Usage  

### For Users  
1. **Sign Up / Log In**  
   - Create an account or log in to access the app's features.  
2. **Browse Hotels**  
   - Explore a variety of hotels available for booking.  
3. **Make a Booking**  
   - Select a hotel and book your stay by completing the payment process.  
4. **Receive Receipt**  
   - After booking, receive your booking receipt via email, and also download it from the platform.  
5. **Leave a Review**  
   - After completing your stay, leave a review and rate the hotel using a star-based system.  

### For Hotel Owners  
1. **Log In as Owner**  
   - Log in with your owner credentials to access the hotel management section.  
2. **Create a Hotel Listing**  
   - Add new hotel properties with details such as location, pricing, and amenities.  
3. **Edit or Delete Listings**  
   - Manage your listings by editing existing hotels or deleting them if necessary.  
4. **View Bookings and Reviews**  
   - View user reviews for your hotels and manage bookings.  

### General  
- **Role-Based Access**  
   - The app provides different functionality for regular users and hotel owners, ensuring a personalized experience for each role.  


