import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DeleteAcc() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Untuk tombol kembali

  // Fungsi untuk menghapus data pengguna
  const handleDeleteUser = (e) => {
    e.preventDefault();

    // Mengirim permintaan DELETE ke API
    axios
      .delete(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then(() => setMessage(`✅ User deleted successfully`))
      .catch((error) => setMessage(`❌ Error: ${error.message}`));

    // Reset form
    setId("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <Link
          to="/help"
          className="inline-block mb-4 text-blue-500 hover:text-blue-700"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Delete User
        </h1>

        {/* Form Delete User */}
        <form onSubmit={handleDeleteUser} className="space-y-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition duration-200"
          >
            Delete User
          </button>
        </form>

        {/* Menampilkan Pesan Sukses/Error */}
        {message && <p className="mt-4 font-semibold">{message}</p>}
      </div>
    </div>
  );
}