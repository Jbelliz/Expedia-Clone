import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../api";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error("Unable to load bookings:", error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const changeStatus = async (booking, newStatus) => {
    try {
      await axios.patch(`${API_URL}/bookings/${booking.id}`, {
        status: newStatus,
      });

      loadBookings();
    } catch (error) {
      console.error("Unable to update booking:", error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/bookings/${id}`);
      loadBookings();
    } catch (error) {
      console.error("Unable to delete booking:", error);
    }
  };

  return (
    <div style={{ width: "95%", margin: "30px auto" }}>
      <Link to="/admin">← Back to Admin Dashboard</Link>

      <h1 style={{ fontSize: "30px", margin: "20px 0" }}>
        Booking Management
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings have been created yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Traveler</th>
              <th style={cellStyle}>Phone</th>
              <th style={cellStyle}>Total</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={cellStyle}>
                  {booking.id}
                </td>

                <td style={cellStyle}>
                  {booking.type}
                </td>

                <td style={cellStyle}>
                  {booking.traveler
                    ? `${booking.traveler.firstName} ${booking.traveler.lastName}`
                    : "Not provided"}
                </td>

                <td style={cellStyle}>
                  {booking.traveler?.mobile || "Not provided"}
                </td>

                <td style={cellStyle}>
                  ₹{Number(booking.total || 0).toLocaleString()}
                </td>

                <td style={cellStyle}>
                  {booking.status}
                </td>

                <td style={cellStyle}>
                  {booking.status !== "confirmed" && (
                    <button
                      onClick={() =>
                        changeStatus(booking, "confirmed")
                      }
                      style={buttonStyle}
                    >
                      Confirm
                    </button>
                  )}

                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() =>
                        changeStatus(booking, "cancelled")
                      }
                      style={buttonStyle}
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => deleteBooking(booking.id)}
                    style={buttonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};

const buttonStyle = {
  marginRight: "5px",
  padding: "5px 10px",
  cursor: "pointer",
};