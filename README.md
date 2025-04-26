# FatikSheba - Healthcare Platform (Client Side)

## Project Overview

FatikSheba is a comprehensive healthcare platform designed to connect patients with doctors and provide healthcare services online. This repository contains the client-side application built with React.

## Features

- User authentication and authorization
- Doctor profiles and specialization browsing
- Responsive design for all devices
- Interactive UI with modern design principles
- Role-based access control system

## User Roles and Permissions

FatikSheba implements a comprehensive role-based access control system with three user types:

### Admin

- Dashboard for platform management
- User management (approve/reject physician registrations)
- Content management for the platform
- Analytics and reporting capabilities
- Blog post management and moderation

### Physician

- Professional profile creation and management
- Patient history and medical records access
- Prescription management
- Blog posting and health advice sharing
- Direct messaging with patients

### Patient

- Personal health profile management
- Doctor search and filtering by specialization
- Medical history tracking
- Health problem sharing and discussion
- Rating and reviewing physicians
- Direct messaging with assigned physicians

## Technology Stack

- **React.js** - Frontend library
- **React Router** - For navigation and routing
- **Tailwind CSS** - For styling and responsive design
- **Material UI** - Component library
- **Firebase** - Authentication and hosting
- **Axios** - HTTP client for API requests
- **Flowbite** - UI component library

## Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/FatikSheba.git
   cd FatikSheba/doctor-client-side
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_API_URL=your_backend_api_url
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Deployment

This project is configured for Firebase hosting. To deploy:

1. Build the project

   ```
   npm run build
   ```

2. Deploy to Firebase
   ```
   firebase deploy --only hosting
   ```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/       # React context providers
  ├── hooks/          # Custom React hooks
  ├── images/         # Static images
  ├── pages/          # Application pages
  ├── App.js          # Main application component
  └── index.js        # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
