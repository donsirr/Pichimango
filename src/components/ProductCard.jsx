import { Link } from "react-router-dom";

function ProductCard({ image, name, category, description }) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    return (
        <Link to={`/product/${slug}`}>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition p-4 cursor-pointer">
                <img src={image} alt={name} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-sm text-gray-500 mb-2">{category}</p>
                <p className="text-sm text-gray-700">{description}</p>
            </div>
        </Link>
    );
}

export default ProductCard;
