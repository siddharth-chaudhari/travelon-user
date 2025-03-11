import { useEffect, useState } from "react";

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-6">
            <h2 className="text-3xl font-extrabold text-yellow-400 mb-6">Your Bookings</h2>
            
            {bookings.length > 0 ? (
                <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
                    {bookings.map((booking, index) => (
                        <div key={index} className="border-b border-gray-700 py-3">
                            <p><strong className="text-yellow-400">From:</strong> {booking.from} → <strong className="text-yellow-400">To:</strong> {booking.to}</p>
                            <p><strong className="text-yellow-400">Date:</strong> {booking.date}</p>
                            <p><strong className="text-yellow-400">Status:</strong> {booking.status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-300">No bookings available yet.</p>
                </div>
            )}
        </div>
    );
}

export default Bookings;
