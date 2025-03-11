import { motion } from "framer-motion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaExchangeAlt, FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
    const [date, setDate] = useState(null);

    return (
        <div className="w-full h-screen flex flex-col bg-gray-900 text-white relative">
            {/* Navbar */}
            <nav className="w-full fixed top-0 left-0 bg-gray-900 backdrop-blur-lg py-4 px-8 flex justify-between items-center shadow-md z-50">
                <h1 className="text-3xl font-extrabold text-white">Travelon</h1>
                <div className="space-x-6">
                    <Link to="/login" className="text-gray-300 hover:text-yellow-400 transition font-medium">Login</Link>
                    <Link to="/register" className="text-gray-300 hover:text-yellow-400 transition font-medium">Register</Link>
                </div>
            </nav>

            {/* Hero Section with Booking Form */}
            <div className="w-full h-full flex flex-col bg-black items-center justify-center text-center px-6 relative z-10">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Book Your <span className="text-yellow-400">Ride</span> Now
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Find the best rides at the best prices. Travel hassle-free with Travelon.
                </motion.p>
                
                {/* Booking Form */}
                <motion.div
                    className="mt-6 bg-gray-900/80 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center z-50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="relative w-full md:w-40">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
                        <input
                            type="text"
                            placeholder="From"
                            className="pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <FaExchangeAlt className="text-yellow-400 text-2xl" />
                    </div>
                    <div className="relative w-full md:w-40">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
                        <input
                            type="text"
                            placeholder="To"
                            className="pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full"
                        />
                    </div>

                    {/* Date Picker with Icon */}
                    <div className="relative w-full md:w-52">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg z-10" />
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select Date"
                            className="pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full cursor-pointer outline-none"
                        />
                    </div>

                    <button
                        className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center gap-2"
                    >
                        <FaSearchLocation className="text-lg" /> Search
                    </button>
                </motion.div>

                {/* Book Now Button */}
                <motion.button
                    className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    Book Now
                </motion.button>
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-4 text-gray-400 text-sm bg-gray-900/90 fixed bottom-0 z-50">
                © 2025 Travelon. All rights reserved.
            </footer>
        </div>
    );
}

export default Home;
