import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function UpdateAcc() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

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
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-400 p-4" // Gradient Hijau
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 backdrop-blur-md bg-opacity-80"
        variants={formVariants}
      >
        <Link
          to="/help"
          className="inline-block mb-6 text-blue-500 hover:text-blue-700 transition duration-300"
          variants={formVariants}
          whileHover={{ scale: 1.1 }}
        >
          &larr; Back
        </Link>
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          variants={formVariants}
        >
          Update Account
        </motion.h1>
        <form
          onSubmit={handleUpdateUser}
          className="space-y-6"
          variants={formVariants}
        >
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <motion.button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            variants={formVariants}
          >
            Update User
          </motion.button>
          {message && (
            <motion.p
              className="text-center text-sm text-gray-700 mt-4"
              variants={formVariants}
            >
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}