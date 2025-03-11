import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (!name || !username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (storedUsers.some((user) => user.email === email)) {
            setError("Email already registered.");
            return;
        }

        const newUser = { name, username, email, password };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        alert("Registration successful!");
        navigate("/login");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center text-white bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-400 text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account? <a href="/login" className="text-yellow-400 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
