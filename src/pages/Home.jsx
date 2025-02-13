import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="w-full h-screen flex flex-col bg-black text-white">
            {/* Background with Dark Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?night,city,travel')" }}
            ></div>

            {/* Navbar */}
            <nav className="w-full fixed top-0 left-0 bg-gray-900/80 backdrop-blur-lg py-4 px-8 flex justify-between items-center shadow-md z-10">
                <h1 className="text-3xl font-extrabold text-white">Travelon</h1>
                <div className="space-x-6">
                    <Link to="/login" className="text-gray-300 hover:text-yellow-400 transition font-medium">Login</Link>
                    <Link to="/register" className="text-gray-300 hover:text-yellow-400 transition font-medium">Register</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 relative z-10">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Explore the <span className="text-yellow-400">World</span> in Style.
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Travelon makes booking rides effortless. Experience the future of travel today.
                </motion.p>
                <motion.div
                    className="mt-6 flex gap-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link
                        to="/login"
                        className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-300 transition-all text-lg font-bold"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/register"
                        className="bg-gray-800 text-white border border-gray-600 px-8 py-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-bold"
                    >
                        Sign Up
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-4 text-gray-400 text-sm bg-gray-900/90 fixed bottom-0 z-10">
                © 2025 Travelon. All rights reserved.
            </footer>
        </div>
    );
}

export default Home;
