import { Link, useNavigate } from "react-router-dom";

const Help = () => {
  // Untuk tombol kembali

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Help Page</h1>

        {/* Tombol Navigasi */}
        <div className="space-y-4">
          <Link
            to="/userlist"
            className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded transition duration-200"
          >
            User List
          </Link>

          <Link
            to="/create"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200"
          >
            Create Account
          </Link>

          <Link
            to="/update"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition duration-200"
          >
            Update Account
          </Link>
          <Link
            to="/delete"
            className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded transition duration-200"
          >
            Delete Account
          </Link>
        </div>

        {/* Tombol Kembali */}
        <Link to="/">
          <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded transition duration-200">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Help;