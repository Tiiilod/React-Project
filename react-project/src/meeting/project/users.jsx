import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Impor Link dari react-router-dom
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]); // State untuk menyimpan data user
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(""); // State untuk error

  // Fetch data user dari API saat komponen dimuat
  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users") // Ambil data dari API
      .then((response) => {
        setUsers(response.data); // Simpan data user ke state
        setLoading(false); // Matikan loading
      })
      .catch((error) => {
        setError("Error fetching users: " + error.message); // Set error jika gagal
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Tombol Kembali */}
      <div className="w-full flex justify-start mb-6">
        <Link to="/help">
          <button className="px-6 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-800 transition duration-300 ease-in-out transform hover:scale-105">
            Kembali
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-700 mb-6">User List</h1>

      {/* Loading & Error Message */}
      {loading && <p className="text-lg text-blue-500">Loading users...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      {/* Menampilkan daftar user dengan .map() */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0
          ? users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
              >
                {/* Avatar User */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border border-gray-300"
                />

                {/* Informasi User */}
                <h2 className="text-xl font-bold mt-2">{user.name}</h2>
                <p className="text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-500">
                  <strong>Password:</strong> {user.password || "********"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  <strong>ID:</strong> {user.id} {/* Menampilkan ID user */}
                </p>
              </div>
            ))
          : !loading && <p className="text-gray-500">No users found.</p>}
      </div>
    </div>
  );
}