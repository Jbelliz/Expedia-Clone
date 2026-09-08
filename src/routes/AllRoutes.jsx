import { Admin } from "../features/admin/AdminFlight";
import { AdminStay } from "../features/admin/AdminStay";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import { HomePage } from "./HomePage";
import { AdminDashboard } from "../features/admin/AdminDashboard";
import { AdminProducts } from "../features/admin/AdminProducts";
import { AllHotels } from "../features/admin/AllHotels";
import { Destination } from "../features/things-todo/Destination";
import HomePage from "../features/home/HomePage";
import { Login } from "../features/auth/Login";
import { Register } from "../features/auth/Register";
import StayData from "../features/stay/StayData";
import CheckoutPage from "../features/bookings/CheckoutPage";
import FlightData from "../features/flights/FlightData";
import CartPage from "../features/bookings/CartPage";
import { AdminUsers } from "../features/admin/AdminUsers";
import { AdminBookings } from "../features/admin/AdminBookings";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/adminflight" element={<Admin />} />
        <Route path="/admin/adminstay" element={<AdminStay />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/hotels" element={<AllHotels />} />
        <Route path="/ThingsToDo" element={<Destination />} />
        <Route path="/stay" element={<StayData />} />
        <Route path="/flight" element={<FlightData />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />

        <Route path="/checkout" element={<CheckoutPage />}></Route>
      </Routes>
    </>
  );
};

// add
