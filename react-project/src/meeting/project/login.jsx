import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginMas = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        // Simpan token ke localStorage jika login berhasil
        localStorage.setItem("authToken", response.data.access_token);

        // Redirect ke halaman produk
        navigate("/product");
      })
      .catch((error) => {
        setError("Login gagal! Silakan periksa username dan password Anda.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Silakan login untuk mengakses akun Anda
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-sm font-semibold text-gray-600 mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
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
              className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link to="/help">
                <a className="text-blue-500 hover:underline">Buat akun</a>
              </Link>
            </p>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginMas;

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const LoginMas = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null); // Menyimpan data user
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Melakukan request login
//     axios
//       .post("https://api.escuelajs.co/api/v1/auth/login", {
//         email,
//         password,
//       })
//       .then((response) => {
//         // Simpan token ke localStorage jika login berhasil
//         localStorage.setItem("authToken", response.data.access_token);

//         // Mengambil profil pengguna setelah login
//         axios
//           .get("https://api.escuelajs.co/api/v1/auth/profile", {
//             headers: {
//               Authorization: `Bearer ${response.data.access_token}`,
//             },
//           })
//           .then((profileResponse) => {
//             setUser(profileResponse.data); // Simpan data profil pengguna
//             setLoading(false);
//             navigate("/product"); // Redirect ke halaman produk
//           })
//           .catch((error) => {
//             setError("Gagal mengambil data profil.");
//             setLoading(false);
//           });
//       })
//       .catch((error) => {
//         setError("Login gagal! Silakan periksa username dan password Anda.");
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
//         <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700">
//           Welcome Back!
//         </h1>
//         <p className="text-center text-gray-500 mb-6">
//           Silakan login untuk mengakses akun Anda
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label
//               className="block text-sm font-semibold text-gray-600 mb-2"
//               htmlFor="email"
//             >
//               email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Masukkan Email"
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-sm font-semibold text-gray-600 mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-3 border rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Masukkan password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-600">
//               Belum punya akun?{" "}
//               <Link to="/help">
//                 <a className="text-blue-500 hover:underline">Buat akun</a>
//               </Link>
//             </p>
//           </div>
//         </form>

//         {error && (
//           <div className="mt-4 text-center text-red-600">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Menampilkan data profil pengguna setelah login */}
//         {user && (
//           <div className="mt-6 text-center text-gray-600">
//             <p>Welcome, {user.name}!</p>
//             <p>Email: {user.email}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginMas;