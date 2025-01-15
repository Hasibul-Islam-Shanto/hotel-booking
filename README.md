# Hotel Booking App
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](link-to-build)

## Description
A comprehensive hotel booking platform built with Next.js 14, React.js, TypeScript, and Tailwind CSS. Users can seamlessly browse and book hotels, complete secure payments, and manage their bookings. Key features include automated email receipts, downloadable receipts, and a review system for booked hotels. Hotel owners can efficiently manage their listings with options to create, edit, and delete hotels. The app ensures secure authentication and role-based authorization using Auth.js and leverages MongoDB for robust data management.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
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

## Screenshots
- **Login and Registration**  
![Screenshot 2025-01-15 at 2 31 53 PM (2)](https://github.com/user-attachments/assets/cedc1594-6784-4239-96a6-2760fce6657b)
![Screenshot 2025-01-15 at 2 32 03 PM (2)](https://github.com/user-attachments/assets/1fe24c94-8f80-434c-b15b-cb0ee96fa2d0)

- **Home**
  ![Screenshot 2025-01-15 at 2 32 12 PM (2)](https://github.com/user-attachments/assets/70037a3a-9bab-4c47-b243-fe7f261fba9e)

- **Hotel Details**
  ![Screenshot 2025-01-15 at 2 33 28 PM (2)](https://github.com/user-attachments/assets/251d17fd-2df9-4231-8b77-edbf0b240ec4)

- **Payment process**
  ![Screenshot 2025-01-15 at 2 33 49 PM (2)](https://github.com/user-attachments/assets/2b0b00a4-ef7b-4b90-a242-cbab22701756)

- **Payment Confirm**
 ![Screenshot 2025-01-15 at 2 34 34 PM (2)](https://github.com/user-attachments/assets/24975d10-e1bd-413d-8ef9-c46f6cf164fd)

  
- **Payment confirmation Email with attachment**
  ![Screenshot 2025-01-15 at 2 35 34 PM (2)](https://github.com/user-attachments/assets/87c09c0c-ea61-421c-8a33-d7fcdc65a6ad)
![Screenshot 2025-01-15 at 2 35 26 PM (2)](https://github.com/user-attachments/assets/bac4e17e-229e-4eb2-a4d6-ca09c83330e1)

- **Booking List**
![Screenshot 2025-01-15 at 2 35 09 PM (2)](https://github.com/user-attachments/assets/8c5e6611-08a4-4234-adc5-7dd06daf6a97)

- **Hotel Manage List**
![Screenshot 2025-01-15 at 2 36 16 PM (2)](https://github.com/user-attachments/assets/0201351a-2209-41be-9876-ce79fe743ec6)

- **Trip Details**
  ![Screenshot 2025-01-15 at 2 35 01 PM (2)](https://github.com/user-attachments/assets/e3dd3e67-3fbe-471d-bac1-4404c3f59e89)

- **Create Hotel**
  ![Screenshot 2025-01-15 at 2 54 52 PM (2)](https://github.com/user-attachments/assets/65e2c83e-91b4-49cf-9477-bade53318226)
![Screenshot 2025-01-15 at 2 54 49 PM (2)](https://github.com/user-attachments/assets/9049826b-25ce-48eb-a1f2-eb69d8e25158)





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


