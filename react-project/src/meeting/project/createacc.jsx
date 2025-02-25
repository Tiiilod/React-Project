import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    avatar: "https://i.imgur.com/LDOO4Qs.jpg",
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

  const handleCreateUser = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users", newUser)
      .then((response) => {
        setMessage(`✅ User created: ${response.data.name}`);
      })
      .catch((error) => setMessage(`❌ Error: ${error.message}`));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-4" // Gradient biru
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md backdrop-blur-md bg-opacity-80"
        variants={formVariants}
      >
        <motion.button
          onClick={handleBack}
          className="mb-6 text-blue-500 hover:text-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }}
          variants={formVariants}
        >
          &larr; Back
        </motion.button>

        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-8"
          variants={formVariants}
        >
          Create User
        </motion.h2>

        <form
          onSubmit={handleCreateUser}
          className="space-y-6"
          variants={formVariants}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            variants={formVariants}
          >
            Create User
          </motion.button>
        </form>

        {message && (
          <motion.p
            className="text-center mt-6 text-sm font-semibold text-gray-700"
            variants={formVariants}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}