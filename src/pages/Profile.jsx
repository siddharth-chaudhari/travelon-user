import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

            {/* Soft Glow Effects */}
            <div className="absolute w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl top-10 left-1/4"></div>
            <div className="absolute w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl bottom-10 right-1/4"></div>

            {/* Profile Card */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl p-8 w-96 border border-gray-700 flex flex-col items-center text-white">
                
                {/* Avatar with Soft Glow */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative flex justify-center w-full">
                    <FaUserCircle className="text-7xl text-gray-400 drop-shadow-md" />
                </motion.div>

                {/* User Info with Elegant Typography */}
                {user ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col gap-3 mt-4 w-full text-center">
                        <h2 className="text-2xl font-semibold text-blue-400">{user.name}</h2>
                        <p className="text-gray-300"><span className="font-medium text-blue-300">Username:</span> {user.username}</p>
                        <p className="text-gray-300"><span className="font-medium text-blue-300">Email:</span> {user.email}</p>
                        <p className="text-gray-300"><span className="font-medium text-blue-300">Phone:</span> {user.phone}</p>
                    </motion.div>
                ) : (
                    <p className="text-gray-400 mt-4">Loading...</p>
                )}

                {/* Back to Dashboard Button */}
                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => navigate("/dashboard")}
                    className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all hover:bg-yellow-400">
                    Back to Dashboard
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Profile;

















// import { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) {
//             navigate("/login");
//         } else {
//             setUser(JSON.parse(storedUser));
//         }
//     }, [navigate]);

//     return (
//         <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 relative">
//             {/* Decorative Glowing Circle */}
//             <div className="absolute w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-3xl top-20 left-1/4 transform -translate-x-1/2"></div>
//             <div className="absolute w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl bottom-20 right-1/4 transform translate-x-1/2"></div>
            
//             {/* Profile Card */}
//             <div className="bg-gray-900 shadow-xl shadow-gray-700 rounded-2xl p-8 w-96 relative border border-gray-700 flex flex-col items-center text-left">
//                 {/* Avatar */}
//                 <div className="relative flex justify-center w-full">
//                     <FaUserCircle className="text-7xl text-gray-400" />
//                     <div className="absolute bottom-1 right-33 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900 translate-x-1/2"></div>
//                 </div>
                
//                 {/* User Info */}
//                 {user ? (
//                     <div className="flex flex-col gap-3 mt-4 w-full px-4">
//                         <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
//                         <p><span className="text-yellow-400">Username:</span> <span className="text-white">{user.username}</span></p>
//                         <p><span className="text-yellow-400">Email:</span> <span className="text-white">{user.email}</span></p>
//                         <p><span className="text-yellow-400">Phone:</span> <span className="text-white">{user.phone}</span></p>
//                     </div>
//                 ) : (
//                     <p className="text-gray-400">Loading...</p>
//                 )}
                
//                 {/* Buttons */}
//                 <button onClick={() => navigate("/dashboard")} 
//                     className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-yellow-300 transition-all">
//                     Back to Dashboard
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Profile;




//------------- main ----------------
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) {
//             navigate("/login");
//         } else {
//             setUser(JSON.parse(storedUser));
//         }
//     }, [navigate]);

//     return (
//         <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//             <h2 className="text-4xl font-bold">User Profile</h2>
//             {user ? (
//                 <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
//                     {Object.keys(user).map((key) => (
//                         <p key={key} className="mb-2"><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {user[key]}</p>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//             <button onClick={() => navigate("/dashboard")} className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300">Back to Dashboard</button>
//         </div>
//     );
// }

// export default Profile;
