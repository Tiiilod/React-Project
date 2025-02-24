import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateAcc() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    axios
      .put(`https://api.escuelajs.co/api/v1/users/${userId}`, formData)
      .then((response) => {
        setMessage(`User updated: ${response.data.name}`);
      })
      .catch((error) => {
        setMessage(`Error updating user: ${error.message}`);
      });

    setUserId("");
    setFormData({
      name: "",
      email: "",
      avatar: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <Link
          to="/help"
          className="inline-block mb-4 text-blue-500 hover:text-blue-700"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Account
        </h1>
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Update User
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}