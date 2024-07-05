# Homestead App

Homestead is a mobile application built with React Native that allows users to list, discover, and book accommodations.

Backend Code: [https://github.com/tusharag6/homestead-api](https://github.com/tusharag6/homestead-api)

## Screenshots

### Onboarding Screen

<img src="assets/screenshots/onboarding.jpg" alt="Onboarding Screen" width="300">

### Auth Screens

<div style="display: flex; flex-wrap: wrap">
  <img src="assets/screenshots/signup.jpg" alt="Sign Up Screen" width="30%" style="margin-right:10px" >
  <img src="assets/screenshots/signin.jpg" alt="Sign In Screen" width="30%" style="margin-right:10px">
  <img src="assets/screenshots/signup-error.jpg" alt="Sign Up Error Screen" width="30%" style="margin-right:10px">
  <img src="assets/screenshots/signin-error.jpg" alt="Sign In Error Screen" width="30%" style="margin-right:10px">
</div>

### Explore Screens

<div style="display: flex; flex-wrap: wrap;">
  <img src="assets/screenshots/listing.jpg" alt="Listing Screen" width="30%" style="margin-right:10px">
  <img src="assets/screenshots/listing-details.jpg" alt="Details Screen" width="30%" style="margin-right:10px">
</div>

### Confirm Booking

<div style="display: flex; flex-wrap: wrap;">
  <img src="assets/screenshots/confirm-booking.jpg" alt="Confirm Booking" width="30%" style="margin-right:10px">
</div>

### Profile

<div style="display: flex; flex-wrap: wrap;">
  <img src="assets/screenshots/profile.jpg" alt="Profile" width="30%" style="margin-right:10px">
  <img src="assets/screenshots/edit-profile.jpg" alt="Edit Profile" width="30%" style="margin-right:10px">
</div>

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/tusharag6/homestead.git
   cd homestead
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the application:**

   ```sh
   npm start
   ```

## Running the Backend

To fully utilize the features of the Homestead app, you also need to run the backend services. Follow these steps to set up and run the backend:

1. **Clone the backend repository:**

   ```sh
   git clone https://github.com/tusharag6/homestead-api.git
   cd homestead-api
   ```

2. **Install backend dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the backend repository and add the necessary environment variables. You can use the `.env.sample` file as a template.

4. **Seed the database:**

   ```sh
   npm run seed
   ```

5. **Start the backend server:**

   ```sh
   npm run dev
   ```

Now, with both the frontend and backend running, you can explore the full functionality of the Homestead app. Make sure both servers are running concurrently for the app to work properly.
