import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://your-backend-api.com/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/"); // Redirect to Home Page
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white relative">
            {/* Background with Dark Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?night,city,travel')" }}
            ></div>

            {/* Login Card */}
            <motion.div
                className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-lg shadow-xl w-96 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">Login</h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

                <input
                    className="bg-gray-800 text-white border border-gray-700 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="bg-gray-800 text-white border border-gray-700 w-full p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-yellow-400 text-gray-900 px-6 py-3 w-full rounded-lg shadow-lg hover:bg-yellow-300 transition-all text-lg font-bold"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                    Don't have an account? <a href="/register" className="text-yellow-400 hover:underline">Sign up</a>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;
