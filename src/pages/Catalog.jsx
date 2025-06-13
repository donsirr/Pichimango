import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/fetchProduct";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SHEET_ID = "1RbRS5i0uMv4gIOQbC7v5Fxb4bQkUqI5MOrkisz3bqwU";
const API_KEY = "AIzaSyBChi8Upv5drXcCZ7Sc5cKJ5gbpkpwY6QM";
const SHEET_NAME = "Products";
const ITEMS_PER_PAGE = 6;

function Catalog() {
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [filters, setFilters] = useState({ category: "", brand: "", price: [0, 1000] });
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchProducts(SHEET_ID, API_KEY, SHEET_NAME).then((data) => {
            setAllProducts(data);
            const prices = data.map((p) => parseFloat(p.Price));
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setPriceRange([min, max]);
            setFilters((f) => ({ ...f, price: [min, max] }));
        });
    }, []);

    useEffect(() => {
        const filtered = allProducts.filter((p) => {
            const matchesCategory = !filters.category || p.Category === filters.category;
            const matchesBrand = !filters.brand || p.Brand === filters.brand;
            const matchesPrice = parseFloat(p.Price) >= filters.price[0] && parseFloat(p.Price) <= filters.price[1];
            return matchesCategory && matchesBrand && matchesPrice;
        });

        setDisplayedProducts(filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
    }, [filters, page, allProducts]);

    const categories = [...new Set(allProducts.map((p) => p.Category))];
    const brands = [...new Set(allProducts.map((p) => p.Brand))];
    const maxPage = Math.ceil(
        allProducts.filter((p) => {
            const matchesCategory = !filters.category || p.Category === filters.category;
            const matchesBrand = !filters.brand || p.Brand === filters.brand;
            const matchesPrice = parseFloat(p.Price) >= filters.price[0] && parseFloat(p.Price) <= filters.price[1];
            return matchesCategory && matchesBrand && matchesPrice;
        }).length / ITEMS_PER_PAGE
    );

    const handleClear = () => {
        setFilters({ category: "", brand: "", price: priceRange });
        setPage(1);
    };

    const isLoading = allProducts.length === 0;
    return (
        <div className="min-h-screen bg-white text-gray-900 px-6 sm:px-12 py-16 max-w-7xl mx-auto">
            <h1 className="text-4xl font-serif font-semibold text-center mb-12">Explore the Collection</h1>

            {/* FILTERS */}
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-sm">
                <select
                    value={filters.category}
                    onChange={(e) => {
                        setFilters({ ...filters, category: e.target.value });
                        setPage(1);
                    }}
                    className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 appearance-none shadow-sm focus:outline-none"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select
                    value={filters.brand}
                    onChange={(e) => {
                        setFilters({ ...filters, brand: e.target.value });
                        setPage(1);
                    }}
                    className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 appearance-none shadow-sm focus:outline-none"
                >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Price Range: AED {filters.price[0]} - {filters.price[1]}</label>
                    <input
                        type="range"
                        min={priceRange[0]}
                        max={priceRange[1]}
                        value={filters.price[1]}
                        onChange={(e) =>
                            setFilters({ ...filters, price: [priceRange[0], parseFloat(e.target.value)] })
                        }
                        className="w-full accent-black"
                    />
                </div>

                <button
                    onClick={handleClear}
                    className="border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 shadow-sm"
                >
                    Clear Filters
                </button>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {isLoading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-2xl overflow-hidden bg-gray-100 shadow-md h-[400px]"
                        >
                            <div className="h-2/3 bg-gray-300 w-full" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4" />
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                                <div className="h-4 bg-gray-300 rounded w-1/4" />
                            </div>
                        </div>
                    ))
                ) : (
                    <AnimatePresence>
                        {displayedProducts.map((product, index) => (
                            <Link to={`/product/${product["Product ID"]}`}>
                                <motion.div
                                    key={product["Product ID"] || index}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 group cursor-pointer"
                                >
                                    <div className="w-full bg-white overflow-hidden aspect-[4/5]">
                                        <img
                                            src={product["Image URL"]}
                                            alt={product["Product Name"]}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{product["Product Name"]}</h2>
                                        <p className="text-sm text-gray-500">{product["Brand"]}</p>
                                        <p className="text-base mt-2">AED {product.Price}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* PAGINATION */}
            {maxPage > 1 && (
                <div className="mt-12 flex justify-center gap-4 items-center text-sm">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600">Page {page} of {maxPage}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
                        disabled={page === maxPage}
                        className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Catalog;
