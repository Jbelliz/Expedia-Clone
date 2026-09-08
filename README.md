<h1>Chalo Ghume</h1>

<p>Chalo Ghume is an Expedia-inspired web application built with React, Redux, Firebase, JavaScript, HTML, CSS, Chakra UI, and JSON Server. The app allows users to search, filter, and book hotels and flights, manage cart items, and access an admin panel for reviewing hotels, flights, bookings, and users.<p>


<h2>Tech Stack</h2>

- HTML
- CSS
- JavaScript
- React
- Redux
- React Router
- Chakra UI
- Firebase
- JSON Server


<h2>Dependency</h2>

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

<h2>Features</h2>

- Landing Page
- Login and signup via firebase (OTP).
- View details of flights, hotels.
- Search for flights, hotels, and holiday packages
- Sorting & Filtering and Seraching
- Book flights, hotels.
- Cart Section
- Admin Panel

<h2>Project Structure</h2>

```
src/
  assets/          Static app assets
  components/      Shared reusable UI
    forms/
    home/
    layout/
  config/          App configuration, including Firebase
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

<h2>Installation</h2>

To run this project locally, follow the steps below:

. Clone the repository by running the following command:
git clone https://github.com/Jbelliz/Expedia-Clone.git

. Install the dependencies:
npm install

. Start the server:
npm start

. Start JSON- Server:
npm run server

. Open the website in your browser:
http://localhost:3000/

. The local API runs at:
http://localhost:8080/
<h2>Deployment</h2>

This project has been locally deployed using localhost:3000 and running the server 8080.

<h2> Firebase Configuration <h2>
Firebase authentication is configured in: src/config/firebase.js

<h2> Contribution Guidelines <h2>

Future contributors should follow these guidelines:

- Create a new branch for each feature or bug fix.
- Keep new shared UI inside src/components.
- Keep route-level feature screens inside src/features.
- Keep Redux state logic inside src/store.
- Keep API constants and service helpers inside src/services.
- Keep configuration files inside src/config.
- Do not commit node_modules, local environment files, or generated build artifacts.
- Run npm run build before submitting changes.
- Include a clear description of what changed and screenshots for visible UI updates.

This is Login and Signup pages:-
![login](https://user-images.githubusercontent.com/112754519/231046318-135d34cb-0ae7-46c3-851c-6889441c62de.PNG)



This is the Stays Page:-
![stays](https://user-images.githubusercontent.com/112754519/231046349-d9885d9f-b42d-4d9f-bfc2-0cac0f9a10df.PNG)



This is the Flight Page:-
![Flight](https://user-images.githubusercontent.com/112754519/231046392-fea5d486-9b26-462c-af9a-5727853e6669.PNG)



This is the Admin Page:-
![Admin](https://user-images.githubusercontent.com/112754519/231046415-c8c2f14c-f586-4da0-884a-992bc18b0e12.PNG)


