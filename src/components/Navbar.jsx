import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-30 px-6 sm:px-12 py-4 flex justify-between items-center text-white bg-gradient-to-b from-black/40 to-transparent">
            <h1 className="text-2xl font-bold">Pichimango</h1>
            <div className="space-x-6 text-lg font-medium">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;