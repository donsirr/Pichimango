import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProduct";

const SHEET_ID = "1RbRS5i0uMv4gIOQbC7v5Fxb4bQkUqI5MOrkisz3bqwU";
const API_KEY = "AIzaSyBChi8Upv5drXcCZ7Sc5cKJ5gbpkpwY6QM";
const SHEET_NAME = "Products";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // 👈 React Router hook

  useEffect(() => {
    fetchProducts(SHEET_ID, API_KEY, SHEET_NAME).then((products) => {
      const found = products.find(p => p["Product ID"] === productId);
      setProduct(found);
    });
  }, [productId]);

  if (!product) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white px-6 sm:px-12 py-16 max-w-5xl mx-auto text-gray-900">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        ← Back to Catalog
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product["Image URL"]}
          alt={product["Product Name"]}
          className="w-full h-[600px] object-cover rounded-2xl shadow"
        />
        <div>
          <h1 className="text-4xl font-serif font-semibold">{product["Product Name"]}</h1>
          <p className="text-lg text-gray-500 mt-2">{product["Brand"]}</p>
          <p className="text-2xl mt-4 font-medium">AED {product.Price}</p>
          <p className="mt-6 text-gray-700 leading-relaxed">{product["Description"]}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">How to Buy</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>
                Visit our Facebook page:{" "}
                <a
                  href="https://www.facebook.com/pichimango.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline hover:text-gray-800"
                >
                  @pichimango.ae
                </a>
              </li>
              <li>Send us a direct message with the product name or screenshot.</li>
              <li>We’ll confirm availability and share purchase and delivery details.</li>
              <li>Once confirmed, complete payment via your preferred method.</li>
              <li>Relax while we carefully package and ship your item to you.</li>
            </ol>
            <p className="mt-4 text-sm italic text-gray-500">
              Every order is handled with care and attention — thank you for choosing us.
            </p>
            <a
              href="https://www.facebook.com/pichimango.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
