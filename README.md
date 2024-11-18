# Live Health Desk

A simple patient form management system built with React, Next.js, and Firebase Realtime Database. This system collects and submits patient details such as first name, last name, phone number, birth date, gender, language preference, nationality, and religion. The form data is dynamically handled, and updates are automatically reflected in the Firebase database.

## Features

- Collect patient details such as name, date of birth, gender, contact information, etc.
- Dynamic form handling using React Hook Form.
- Automatically updates Firebase Realtime Database when form values change.
- Status updates are sent to Firebase (active/inactive) based on user input.
- Provides additional information display based on form entries.
- Fully responsive layout using Tailwind CSS.

## Installation

To run the project locally, follow the steps below:

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 20.0.0)
- [npm](https://npmjs.com/)

### Steps to install and run:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/patient-form.git
   cd patient-form

2. Install the dependencies:

   ```bash
   npm install

3. Set up Firebase:

     - Go to Firebase Console.

     - Create a new project if you haven't already.

     - Get your Firebase configuration credentials from the Firebase console.

     - Create a .env.local file in the root directory of the project and add the Firebase configuration:

   ```bash
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_DATABASE_URL=your-database-url
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_APP_ID=your-app-id
   FIREBASE_MEASUREMENT_ID=your-measurement-id

5. Run the development server:

   ```bash
   npm run dev

### Key Features:

- **Real-Time Database Integration:** The app connects with Firebase Realtime Database, sending and receiving patient information.
- **Dynamic Form Handling:** React Hook Form dynamically manages the form data, including validation.
- **Responsive UI:** Tailwind CSS ensures a responsive layout that adjusts to screen sizes.
- **Debounced State Management:** The status is updated to inactive after 5 seconds of inactivity to minimize unnecessary database writes.
