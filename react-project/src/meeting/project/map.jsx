import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AxiosStore2() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub || "User");
    }
  }, []);

  const updateCart = (title, price, change) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[title]?.quantity || 0;
      const newQuantity = currentQuantity + change;
      if (newQuantity <= 0) {
        const { [title]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [title]: { price, quantity: newQuantity } };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Store</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm"
          />
          <span className="text-gray-700 font-medium">Hi, {username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
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
      </div>
    </div>
  );
}

function ShoppingCard({ id, title, price, src, description, quantity, onUpdate }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-full flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
      <Link to={`/product/${id}`} className="text-inherit no-underline">
        <img
          src={src}
          alt={title}
          className="w-full h-60 object-contain rounded-t-lg"
        />
        <div className="py-2 flex-grow">
          <h2 className="text-md font-semibold">{title}</h2>
          <p className="text-gray-700">Harga: Rp.{price}</p>
          <p className="text-gray-700">Quantity: {quantity}</p>
          <p className="text-gray-700">Total: Rp.{quantity * price}</p>
        </div>
      </Link>

      <div className="flex justify-between mt-2">
        <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md" onClick={() => onUpdate(title, price, 1)}>
          Tambah
        </button>
        <button className="bg-red-500 text-white w-1/3 py-2 rounded-md" onClick={() => onUpdate(title, price, -1)}>
          Kurang
        </button>
      </div>
    </div>
  );
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product detail:", error));
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500 mt-4">Loading product details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-md max-w-5xl mx-auto">
        <img src={product.image} alt={product.title} className="w-1/3 h-auto object-contain rounded-lg shadow-sm" />
        <div className="w-2/3 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-4">Rp. {product.price}</p>
          <textarea placeholder="Leave a comment..." className="border p-2 w-full rounded-md" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Submit Comment</button>
        </div>
      </div>
    </div>
  );
}
