import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create() {
  // State untuk form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
    avatar: "https://i.imgur.com/LDOO4Qs.jpg", // default avatar
  });

  // State untuk pesan hasil request
  const [message, setMessage] = useState("");

  // Fungsi untuk mengubah input form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk mengirim data ke API
  const handleCreateUser = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      creationAt: new Date().toISOString(), // Tambah waktu pembuatan
      updatedAt: new Date().toISOString(), // Tambah waktu perubahan
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users", newUser)
      .then((response) => setMessage(`✅ User created: ${response.data.name}`))
      .catch((error) => setMessage(`❌ Error: ${error.message}`));

    // Reset form setelah submit
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/help"
          className="inline-block mb-4 text-blue-500 hover:text-blue-700"
        >
          &larr; Back
        </Link>
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Create User
        </h2>

        {/* Form */}
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded"
          >
            Create User
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className="text-center mt-4 text-sm font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}