import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users: " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 p-4" // Gradient pink
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="w-full flex justify-start mb-8"
        variants={itemVariants}
      >
        <Link to="/help">
          <motion.button
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-lg hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Kembali
          </motion.button>
        </Link>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8 animate-pulse"
        variants={itemVariants}
      >
        User List
      </motion.h1>

      {loading && (
        <p className="text-lg text-blue-500" variants={itemVariants}>
          Loading users...
        </p>
      )}
      {error && (
        <p className="text-lg text-red-500" variants={itemVariants}>
          {error}
        </p>
      )}

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={itemVariants}
      >
        {users.length > 0 ? (
          users.map((user) => (
            <motion.div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transition duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border border-gray-300 mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Password:</strong> {user.password || "********"}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>ID:</strong> {user.id}
              </p>
            </motion.div>
          ))
        ) : !loading ? (
          <p className="text-gray-600" variants={itemVariants}>
            No users found.
          </p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}