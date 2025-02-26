import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AxiosStore2() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.name);
      });
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, [navigate]);

  const updateCart = (title, price, change) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[title]?.quantity || 0) + change;
      if (newQuantity <= 0) {
        const { [title]: _, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [title]: { quantity: newQuantity, price },
      };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  //  const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(search.toLowerCase())
  // );
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
    );
  };


  return (
    <motion.div
      className="p-4 bg-gradient-to-r from-blue-200 via-blue-200 to-purple-100 min-h-screen" // Added min-h-screen
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-purple-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">React Store</h1>
          <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-96 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hi, {username}</span>

          {isAdmin && (
            <Link to="/help">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300">
                Admin Panel
              </button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        {products.map((product) => (
          <ShoppingCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            src={product.image}
            description={product.description}
            quantity={cart[product.title]?.quantity || 0}
            onUpdate={updateCart}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ShoppingCard({
  id,
  title,
  price,
  src,
  description,
  quantity,
  onUpdate,
}) {
  return (
    <motion.div
      className="border rounded-lg shadow-lg p-4 w-full flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-white hover:bg-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/product/${id}`} className="text-inherit no-underline">
        <motion.img
          src={src}
          alt={title}
          className="w-full h-60 object-contain rounded-t-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <div className="py-2 flex-grow">
          <motion.h2
            className="text-md font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h2>
          <p className="text-gray-700">Harga: ${price}</p>
          <p className="text-gray-700">Quantity: {quantity}</p>
          <p className="text-gray-700">Total: ${quantity * price}</p>
        </div>
      </Link>

      <div className="flex justify-between mt-2">
        <button
          className="bg-blue-500 text-white w-1/3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => onUpdate(title, price, 1)}
        >
          Tambah
        </button>
        <button
          className="bg-red-500 text-white w-1/3 py-2 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => onUpdate(title, price, -1)}
        >
          Kurang
        </button>
      </div>
    </motion.div>
  );
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product detail:", error));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.name);
      });

    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(search.toLowerCase())
  // );

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Loading product details...
      </p>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      console.log(
        "Menambahkan",
        product.title,
        "ukuran",
        selectedSize,
        "ke dalam tas belanja"
      );
    } else {
      alert("Silakan pilih ukuran terlebih dahulu!");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-[100px] p-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">React Store</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hi, {username}</span>

          {isAdmin && (
            <Link to="/help">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300">
                Admin Panel
              </button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Product Detail */}
      <motion.div
        className="p-8 flex flex-col lg:flex-row items-center lg:items-start lg:gap-8 bg-gray-50 rounded-lg shadow-md max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg shadow-sm"
          />
        </motion.div>

        <motion.div
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <p className="text-gray-500 mb-6">Rating: 4.5/5 (146 reviews)</p>

          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-2">Select Size:</p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-lg text-gray-700 hover:bg-blue-100 focus:bg-blue-200 transition duration-300 ${
                    selectedSize === size ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/product")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-300"
            >
              Back to Home
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Add to Bag
            </button>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            Free shipping on all continental Indonesia orders.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}