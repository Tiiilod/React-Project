import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginMas = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data.access_token);

        // Cek apakah user adalah admin
        if (email === "admin@mail.com" && password === "admin123") {
          localStorage.setItem("isAdmin", JSON.stringify(true));
        } else {
          localStorage.removeItem("isAdmin");
        }

        navigate("/product");
      })
      .catch((error) => {
        setError("Login gagal! Silakan periksa email dan password Anda.");
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-500 to-purple-500" // Changed Gradient
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg backdrop-blur-md bg-opacity-80" // Backdrop blur
        variants={formVariants}
      >
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 animate-pulse">
          {" "}
          {/* Added animation */}
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Silakan login untuk mengakses akun Anda
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={formVariants}
        >
          {" "}
          {/* Space-y-6 */}
          <div className="mb-5">
            <label
              className="block text-sm font-semibold text-gray-600 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300" // Added transition
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              required // Added required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-600 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300" // Added transition
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required // Added required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-800 transition duration-300" // Changed button gradient
            whileHover={{ scale: 1.05 }} // Added hover effect
          >
            Login
          </motion.button>
          <div className="text-center mt-6" variants={formVariants}>
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link to="/create" className="text-blue-500 hover:underline">
                Buat akun
              </Link>
            </p>
          </div>
        </form>

        {error && (
          <motion.div
            className="mt-4 text-center text-red-600"
            variants={formVariants}
          >
            <p>{error}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoginMas;