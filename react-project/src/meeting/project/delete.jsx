import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DeleteAcc() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();

    axios
      .delete(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then(() => setMessage(`✅ User deleted successfully`))
      .catch((error) => setMessage(`❌ Error: ${error.message}`));

    setId("");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-red-300 via-red-400 to-red-500 p-4" // Gradient Ungu-Merah
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md backdrop-blur-md bg-opacity-80"
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
          Delete User
        </motion.h1>

        <form
          onSubmit={handleDeleteUser}
          className="space-y-6"
          variants={formVariants}
        >
          <input
            type="text"
            placeholder="Enter User ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          />

          <motion.button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            variants={formVariants}
          >
            Delete User
          </motion.button>
        </form>

        {message && (
          <motion.p
            className="mt-6 font-semibold text-center text-gray-700"
            variants={formVariants}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}