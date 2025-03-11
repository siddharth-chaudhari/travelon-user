import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
 
    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find((u) => u.username === username && u.password === password);

        if (!user) {
            setError("Invalid username or password.");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
        navigate("/dashboard");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none border border-gray-600 focus:border-yellow-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none border border-gray-600 focus:border-yellow-400"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-sm text-center mt-4">
                    Don't have an account? <a href="/register" className="text-yellow-400 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
