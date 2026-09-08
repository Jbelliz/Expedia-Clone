import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../services/api";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Unable to load users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div style={{ width: "90%", margin: "30px auto" }}>
      <Link to="/admin">← Back to Admin Dashboard</Link>

      <h1 style={{ fontSize: "30px", margin: "20px 0" }}>
        Registered Users
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Phone Number</th>
            <th style={cellStyle}>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={cellStyle}>{user.id}</td>

              <td style={cellStyle}>
                {user.user_name || "Not provided"}
              </td>

              <td style={cellStyle}>
                {user.number || "Not provided"}
              </td>

              <td style={cellStyle}>
                {user.email || "Not provided"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};
