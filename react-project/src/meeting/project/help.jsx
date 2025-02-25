import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

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
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center backdrop-blur-md bg-opacity-80"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 animate-pulse" // Added animate-pulse
          variants={itemVariants}
        >
          Help Page
        </motion.h1>

        <motion.div className="space-y-6" variants={itemVariants}>
          <Link
            to="/userlist"
            className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            User List
          </Link>

          <Link
            to="/create"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Create Account
          </Link>

          <Link
            to="/update"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Update Account
          </Link>

          <Link
            to="/delete"
            className="block w-full   bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Delete Account
          </Link>
        </motion.div>

        <motion.button
          onClick={handleBack}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          variants={itemVariants}
        >
          Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Help;