# Chalo Ghume

Chalo Ghume is an Expedia-inspired web application built with React, Redux, Firebase, JavaScript, HTML, CSS, Chakra UI, and JSON Server. The app allows users to search, filter, and book hotels and flights, manage cart items, and access an admin panel for reviewing hotels, flights, bookings, and users.

Repository: https://github.com/Jbelliz/Expedia-Clone

## Project Type

Web Application

## Tech Stack

- HTML
- CSS
- JavaScript
- React
- Redux
- React Router
- Chakra UI
- Firebase
- JSON Server

## Dependencies

- axios
- @chakra-ui/react
- @chakra-ui/icons
- @emotion/react
- @emotion/styled
- firebase
- font-awesome
- framer-motion
- json-server
- react
- react-datepicker
- react-dom
- react-icons
- react-redux
- react-router-dom
- react-scripts
- react-toastify
- redux
- redux-thunk
- styled-components
- web-vitals

## Features

### User Features

- Landing page with travel search options
- Login and signup with Firebase authentication
- Search for hotels, flights, and things to do
- Filter and sort hotel listings
- View hotel and flight information
- Add hotels and flights to the cart
- Checkout and booking workflow

### Admin Features

- Admin dashboard
- Manage hotel listings
- Manage flight listings
- View users
- View booking records

## Project Structure

The project uses a clear folder structure so shared code, feature pages, services, configuration, and Redux state are easy to find.

```text
src/
  assets/          Static app assets
  components/      Shared reusable UI
    forms/
    home/
    layout/
  config/          App configuration, including Firebase setup
  features/        Route-level screens grouped by feature
    admin/
    auth/
    bookings/
    flights/
    home/
    stay/
    things-todo/
  routes/          React Router route definitions
  services/        Shared API constants and service setup
  store/           Redux store, actions, reducers, and action types
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jbelliz/Expedia-Clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Expedia-Clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start JSON Server in one terminal:

   ```bash
   npm run server
   ```

   The local API runs at:

   ```text
   http://localhost:8080
   ```

5. Start the React app in another terminal:

   ```bash
   npm start
   ```

   The app usually opens at:

   ```text
   http://localhost:3000
   ```

   If port `3000` is already in use, React may ask to use another port.

## Firebase Configuration

Firebase authentication is configured in:

```text
src/config/firebase.js
```

To use a different Firebase project, create a Firebase project, enable the required authentication method, and update the Firebase config values in that file.

## Available Scripts

- `npm start` - Runs the React development server
- `npm run server` - Runs JSON Server with `db.json` on port `8080`
- `npm run build` - Creates an optimized production build
- `npm test` - Runs the test runner

## Deployment

The app can be deployed locally or to a cloud hosting platform.

### Local Deployment

1. Install dependencies with `npm install`.
2. Start JSON Server with `npm run server`.
3. Start the React app with `npm start`.
4. Test authentication, search, filtering, booking, cart, and admin workflows.

### Cloud Deployment

1. Build the app:

   ```bash
   npm run build
   ```

2. Deploy the generated `build/` folder or connect the repository to a hosting service such as Vercel, Google Cloud Platform, or AWS.
3. Configure Firebase credentials and any required environment settings for production.
4. Verify the deployed app after publishing.

Current deployed/reference URL:

```text
https://interesting-stretch-8935-liart.vercel.app/
```

## Contribution Guidelines

Future contributors should follow these guidelines:

- Create a new branch for each feature or bug fix.
- Keep new shared UI inside `src/components`.
- Keep route-level feature screens inside `src/features`.
- Keep Redux state logic inside `src/store`.
- Keep API constants and service helpers inside `src/services`.
- Keep configuration files inside `src/config`.
- Do not commit `node_modules`, local environment files, or generated build artifacts.
- Run `npm run build` before submitting changes.
- Include a clear description of what changed and screenshots for visible UI updates.

## Screenshots

Login and signup pages:

![login](https://user-images.githubusercontent.com/112754519/231046318-135d34cb-0ae7-46c3-851c-6889441c62de.PNG)

Stays page:

![stays](https://user-images.githubusercontent.com/112754519/231046349-d9885d9f-b42d-4d9f-bfc2-0cac0f9a10df.PNG)

Flight page:

![Flight](https://user-images.githubusercontent.com/112754519/231046392-fea5d486-9b26-462c-af9a-5727853e6669.PNG)

Admin page:

![Admin](https://user-images.githubusercontent.com/112754519/231046415-c8c2f14c-f586-4da0-884a-992bc18b0e12.PNG)
