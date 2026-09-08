import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../services/api";
import "./AdminDashboard.Module.css";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    flights: 0,
    hotels: 0,
    users: 0,
    bookings: 0,
    cartItems: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCount = async (endpoint) => {
      try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data.length;
      } catch (error) {
        console.error(`Unable to load ${endpoint}:`, error);
        return 0;
      }
    };

    const loadDashboard = async () => {
      setLoading(true);

      const [
        flights,
        hotels,
        users,
        bookings,
        hotelCart,
        flightCart,
      ] = await Promise.all([
        getCount("flight"),
        getCount("hotel"),
        getCount("users"),
        getCount("bookings"),
        getCount("hotelcart"),
        getCount("flightcart"),
      ]);

      setStats({
        flights,
        hotels,
        users,
        bookings,
        cartItems: hotelCart + flightCart,
      });

      setLoading(false);
    };

    loadDashboard();
  }, []);

  return (
    <div className="mainAdminLandingpage">
      <div className="adminSideBr">
        <h1>
          <Link to="/admin">Home</Link>
        </h1>

        <h1>
          <Link to="/admin/adminflight">Add Flight</Link>
        </h1>

        <h1>
          <Link to="/admin/adminstay">Add Stay</Link>
        </h1>

        <h1>
          <Link to="/admin/products">All Flights</Link>
        </h1>

        <h1>
          <Link to="/admin/hotels">All Hotels</Link>
        </h1>

        <h1>
          <Link to="/admin/bookings">Bookings</Link>
        </h1>

        <h1>
          <Link to="/admin/users">Users</Link>
        </h1>

        <h1>
          <Link to="/">Exit Admin</Link>
        </h1>
      </div>

      <div className="mainBox">
        <div className="mainBoxHead">
          <h1>Admin Dashboard</h1>
          <hr />
        </div>

        {loading ? (
          <h2>Loading dashboard...</h2>
        ) : (
          <div className="DataBoxes">

            <div className="dataBx">
              <h1>Total Hotels</h1>
              <h1>{stats.hotels}</h1>
              <Link to="/admin/hotels">View</Link>
            </div>

            <div className="dataBx">
              <h1>Total Flights</h1>
              <h1>{stats.flights}</h1>
              <Link to="/admin/products">View</Link>
            </div>

            <div className="dataBx">
              <h1>Total Users</h1>
              <h1>{stats.users}</h1>
              <Link to="/admin/users">View</Link>
            </div>

            <div className="dataBx">
              <h1>Total Bookings</h1>
              <h1>{stats.bookings}</h1>
              <Link to="/admin/bookings">View</Link>
            </div>

            <div className="dataBx">
              <h1>Cart Items</h1>
              <h1>{stats.cartItems}</h1>
              <Link to="/cart">View Cart</Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
