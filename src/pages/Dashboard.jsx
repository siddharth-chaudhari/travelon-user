import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaExchangeAlt, FaSearchLocation, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"; // Import react-select

function Dashboard() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const navigate = useNavigate();

  const cities = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];
  const cityOptions = cities.map((city) => ({ value: city, label: city }));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://46b7-2409-40c2-103b-ca94-d503-594e-1eb5-c4cd.ngrok-free.app/api/routes");
  
      console.log("Raw Response:", response);
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text(); // Read response as text
        console.error("API returned non-JSON:", text);
        throw new Error("Invalid JSON response from server");
      }
  
      const data = await response.json();
      console.log("Fetched Routes:", data);
      setRoutes(data || []);
    } catch (error) {
      console.error("Error fetching routes:", error);
      alert("Failed to fetch routes. Please check API response.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please select all fields!");
      return;
    }
    fetchCars();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const routes = [
    { id: 1, route: "Pune → Mumbai", time: "10:00 AM" },
    { id: 2, route: "Mumbai → Delhi", time: "2:00 PM" },
    { id: 3, route: "Delhi → Bangalore", time: "6:30 AM" },
    { id: 4, route: "Bangalore → Hyderabad", time: "9:00 PM" },
  ];

  const handleBookNow = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log("closing popup");
    setShowForm(false);
  };

  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPassengerCount(count);

    const newPassengers = Array.from({ length: count }, (_, i) => ({
      name: passengers[i]?.name || "",
      age: passengers[i]?.age || "",
    }));
    setPassengers(newPassengers);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${passengerCount} passengers`);
    setShowForm(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-gray-800/90 py-4 px-8 flex justify-between items-center shadow-md z-20">
        <h1 className="text-3xl font-extrabold text-yellow-400">Travelon</h1>
        <div className="flex items-center gap-6">
          <Link to="/bookings" className="text-gray-300 hover:text-yellow-400 transition font-medium">
            View Bookings
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white text-2xl hover:text-yellow-300">
              <FaUserCircle />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                <button onClick={() => navigate("/profile")} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-600">
                  My Profile
                </button>
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-white hover:bg-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-20">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome, <span className="text-yellow-400">{user?.name}</span>
        </h1>
        <p className="mt-3 text-lg text-gray-300">Find the best rides at the best prices.</p>

        {/* Search Form */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
          <Select
            value={from ? { value: from, label: from } : null}
            onChange={(selectedOption) => setFrom(selectedOption ? selectedOption.value : "")}
            options={cityOptions.filter((city) => city.value !== to)}
            placeholder="Select From"
            isClearable
            className="w-full md:w-1/4"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
              singleValue: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
              option: (base, { isFocused }) => ({
                ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
              }),
            }}
          />
          <FaExchangeAlt className="text-yellow-400 text-2xl" />
          <Select
            value={to ? { value: to, label: to } : null}
            onChange={(selectedOption) => setTo(selectedOption ? selectedOption.value : "")}
            options={cityOptions.filter((city) => city.value !== from)}
            placeholder="Select To"
            isClearable
            className="w-full md:w-1/4"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
              singleValue: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
              option: (base, { isFocused }) => ({
                ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
              }),
            }}
          />
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select Date"
            className="w-full md:w-20px h-11 px-3 py-1 rounded-lg bg-gray-900 text-white border border-gray-600 cursor-pointer outline-none focus:border-yellow-400"
          />


          <button onClick={handleSearch} className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center gap-2">
            <FaSearchLocation className="text-lg" /> Search
          </button>
        </div>

        {/* Display Cars in Table Format */}
        <div className="w-full max-w-2xl mx-auto mt-8">
          <table className="w-full border-collapse border border-yellow-400">
            <thead>
              <tr className="bg-yellow-400 text-gray-900">
                <th className="p-2 border">Route</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Book</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id} className="bg-gray-900">
                  <td className="p-2 border">{route.route}</td>
                  <td className="p-2 border">{route.time}</td>
                  <td className="p-2 border">
                    <button
                      onClick={handleBookNow}
                      className="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold">Book Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      {/* User Verification Popup */}
      {showForm && (
        <div className="fixed top-0 right-0 w-180 h-full bg-gray-800 p-6 shadow-lg transition-transform duration-500 translate-x-0 opacity-100 z-50">
          <button onClick={() => setShowForm(false)} className="text-white text-2xl absolute top-4 right-4">✕</button>
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Passenger Details</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert(`Booking Confirmed for ${passengerCount} passengers`); setShowForm(false); }} className="flex flex-col gap-4">
            <label className="text-white">Number of Passengers:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={passengerCount}
              onChange={handlePassengerCountChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
            {passengers.map((_, index) => (
              <div key={index} className="flex gap-2 bg-gray-700 p-3 rounded-lg">
                <p className="text-yellow-400">Passenger {index + 1}</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="p-2 flex-1 bg-gray-600 text-white rounded"
                  onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                />
                <select
                  className="p-2 flex-1 bg-gray-600 text-white rounded"
                  onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="number"
                  placeholder="Age"
                  required
                  className="p-2 flex-1 bg-gray-600 text-white rounded"
                  onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                />
              </div>
            ))}
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-lg font-bold">Confirm Booking</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;








//--------final main
// import { useEffect, useRef, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaExchangeAlt, FaSearchLocation, FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select"; // Import react-select

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [date, setDate] = useState(null);
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [passengerCount, setPassengerCount] = useState(1);

//   const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
//   const navigate = useNavigate();

//   const cities = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];
//   const cityOptions = cities.map((city) => ({ value: city, label: city }));

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [navigate]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchCars = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://myfakeapi.com/api/cars/");
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setCars(data?.cars?.slice(0, 5) || []);
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//       alert("Failed to fetch car data. Loading sample cars.");

//       // Fallback Mock Data
//       setCars([
//         { id: 1, name: "Toyota Camry", year: 2023, make: "Toyota", model: "Camry", image: "https://via.placeholder.com/150" },
//         { id: 2, name: "Honda Civic", year: 2022, make: "Honda", model: "Civic", image: "https://via.placeholder.com/150" },
//         { id: 3, name: "Ford Mustang", year: 2024, make: "Ford", model: "Mustang", image: "https://via.placeholder.com/150" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!from || !to || !date) {
//       alert("Please select all fields!");
//       return;
//     }
//     fetchCars();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   const routes = [
//     { id: 1, route: "Pune → Mumbai", time: "10:00 AM" },
//     { id: 2, route: "Mumbai → Delhi", time: "2:00 PM" },
//     { id: 3, route: "Delhi → Bangalore", time: "6:30 AM" },
//     { id: 4, route: "Bangalore → Hyderabad", time: "9:00 PM" },
//   ];

//   const handleBookNow = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     console.log("closing popup");
//     setShowForm(false);
//   };

//   const handlePassengerCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     setPassengerCount(count);

//     const newPassengers = Array.from({ length: count }, (_, i) => ({
//       name: passengers[i]?.name || "",
//       age: passengers[i]?.age || "",
//     }));
//     setPassengers(newPassengers);
//   };

//   const handlePassengerChange = (index, field, value) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][field] = value;
//     setPassengers(updatedPassengers);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     alert(`Booking Confirmed for ${passengerCount} passengers`);
//     setShowForm(false);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Navbar */}
//       <nav className="w-full fixed top-0 left-0 bg-gray-800/90 py-4 px-8 flex justify-between items-center shadow-md z-20">
//         <h1 className="text-3xl font-extrabold text-yellow-400">Travelon</h1>
//         <div className="flex items-center gap-6">
//           <Link to="/bookings" className="text-gray-300 hover:text-yellow-400 transition font-medium">
//             View Bookings
//           </Link>
//           <div className="relative" ref={dropdownRef}>
//             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white text-2xl hover:text-yellow-300">
//               <FaUserCircle />
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
//                 <button onClick={() => navigate("/profile")} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-600">
//                   My Profile
//                 </button>
//                 <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-white hover:bg-red-500">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-20">
//         <h1 className="text-5xl font-extrabold text-white">
//           Welcome, <span className="text-yellow-400">{user?.name}</span>
//         </h1>
//         <p className="mt-3 text-lg text-gray-300">Find the best rides at the best prices.</p>

//         {/* Search Form */}
//         <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
//           <Select
//             value={from ? { value: from, label: from } : null}
//             onChange={(selectedOption) => setFrom(selectedOption ? selectedOption.value : "")}
//             options={cityOptions.filter((city) => city.value !== to)}
//             placeholder="Select From"
//             isClearable
//             className="w-full md:w-1/4"
//             styles={{
//               control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
//               option: (base, { isFocused }) => ({
//                 ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
//               }),
//             }}
//           />
//           <FaExchangeAlt className="text-yellow-400 text-2xl" />
//           <Select
//             value={to ? { value: to, label: to } : null}
//             onChange={(selectedOption) => setTo(selectedOption ? selectedOption.value : "")}
//             options={cityOptions.filter((city) => city.value !== from)}
//             placeholder="Select To"
//             isClearable
//             className="w-full md:w-1/4"
//             styles={{
//               control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
//               option: (base, { isFocused }) => ({
//                 ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
//               }),
//             }}
//           />
//           <DatePicker
//             selected={date}
//             onChange={(date) => setDate(date)}
//             dateFormat="MMMM d, yyyy"
//             placeholderText="Select Date"
//             className="w-full md:w-20px h-11 px-3 py-1 rounded-lg bg-gray-900 text-white border border-gray-600 cursor-pointer outline-none focus:border-yellow-400"
//           />


//           <button onClick={handleSearch} className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center gap-2">
//             <FaSearchLocation className="text-lg" /> Search
//           </button>
//         </div>

//         {/* Display Cars in Table Format */}
//         <div className="w-full max-w-2xl mx-auto mt-8">
//           <table className="w-full border-collapse border border-yellow-400">
//             <thead>
//               <tr className="bg-yellow-400 text-gray-900">
//                 <th className="p-2 border">Route</th>
//                 <th className="p-2 border">Time</th>
//                 <th className="p-2 border">Book</th>
//               </tr>
//             </thead>
//             <tbody>
//               {routes.map((route) => (
//                 <tr key={route.id} className="bg-gray-900">
//                   <td className="p-2 border">{route.route}</td>
//                   <td className="p-2 border">{route.time}</td>
//                   <td className="p-2 border">
//                     <button
//                       onClick={handleBookNow}
//                       className="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold">Book Now</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//       {/* User Verification Popup */}
//       {showForm && (
//         <div className="fixed top-0 right-0 w-180 h-full bg-gray-800 p-6 shadow-lg transition-transform duration-500 translate-x-0 opacity-100 z-50">
//           <button onClick={() => setShowForm(false)} className="text-white text-2xl absolute top-4 right-4">✕</button>
//           <h2 className="text-xl font-bold text-yellow-400 mb-4">Passenger Details</h2>
//           <form onSubmit={(e) => { e.preventDefault(); alert(`Booking Confirmed for ${passengerCount} passengers`); setShowForm(false); }} className="flex flex-col gap-4">
//             <label className="text-white">Number of Passengers:</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={passengerCount}
//               onChange={handlePassengerCountChange}
//               className="p-2 bg-gray-700 text-white rounded"
//             />
//             {passengers.map((_, index) => (
//               <div key={index} className="flex gap-2 bg-gray-700 p-3 rounded-lg">
//                 <p className="text-yellow-400">Passenger {index + 1}</p>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   required
//                   className="p-2 flex-1 bg-gray-600 text-white rounded"
//                   onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
//                 />
//                 <select
//                   className="p-2 flex-1 bg-gray-600 text-white rounded"
//                   onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
//                 >
//                   <option value="">Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Age"
//                   required
//                   className="p-2 flex-1 bg-gray-600 text-white rounded"
//                   onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
//                 />
//               </div>
//             ))}
//             <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-lg font-bold">Confirm Booking</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;








{/* final Pop up*/ }
// import { useEffect, useRef, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [from, setFrom] = useState(null);
//   const [to, setTo] = useState(null);
//   const [date, setDate] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [passengerCount, setPassengerCount] = useState(1);
//   const [passengers, setPassengers] = useState([{ name: "", age: "" }]);

//   const navigate = useNavigate();

//   const cityOptions = [
//     { value: "Pune", label: "Pune" },
//     { value: "Mumbai", label: "Mumbai" },
//     { value: "Delhi", label: "Delhi" },
//     { value: "Bangalore", label: "Bangalore" },
//     { value: "Hyderabad", label: "Hyderabad" },
//     { value: "Chennai", label: "Chennai" },
//   ];

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [navigate]);

//   const routes = [
//     { route: "Pune → Mumbai", time: "10:00 AM" },
//     { route: "Mumbai → Delhi", time: "2:30 PM" },
//     { route: "Delhi → Bangalore", time: "6:45 PM" },
//   ];

//   const handleBookNow = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handlePassengerCountChange = (e) => {
//     const count = parseInt(e.target.value);
//     setPassengerCount(count);

//     const newPassengers = Array.from({ length: count }, (_, i) => ({
//       name: passengers[i]?.name || "",
//       age: passengers[i]?.age || "",
//     }));
//     setPassengers(newPassengers);
//   };

//   const handlePassengerChange = (index, field, value) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][field] = value;
//     setPassengers(updatedPassengers);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     alert(`Booking Confirmed for ${passengerCount} passengers`);
//     setShowForm(false);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Navbar */}
//       <nav className="w-full fixed top-0 left-0 bg-gray-800/90 py-4 px-8 flex justify-between items-center shadow-md z-10">
//         <h1 className="text-3xl font-extrabold text-yellow-400">Travelon</h1>
//         <div className="flex items-center gap-6">
//           <Link to="/bookings" className="text-gray-300 hover:text-yellow-400 transition font-medium">
//             View Bookings
//           </Link>
//           <div className="relative" ref={dropdownRef}>
//             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white text-2xl hover:text-yellow-300">
//               <FaUserCircle />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Search Box */}
//       <div className="mt-20 flex flex-col items-center justify-center text-center px-6">
//         <h1 className="text-5xl font-extrabold text-white">
//           Welcome, <span className="text-yellow-400">{user?.name}</span>
//         </h1>
//         <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
//           <Select
//             value={from}
//             onChange={(selectedOption) => setFrom(selectedOption)}
//             options={cityOptions.filter((city) => city.value !== to?.value)}
//             placeholder="Select From"
//             isClearable
//             className="w-full md:w-1/4"
//           />
//           <FaExchangeAlt className="text-yellow-400 text-2xl" />
//           <Select
//             value={to}
//             onChange={(selectedOption) => setTo(selectedOption)}
//             options={cityOptions.filter((city) => city.value !== from?.value)}
//             placeholder="Select To"
//             isClearable
//             className="w-full md:w-1/4"
//           />
//           <DatePicker
//             selected={date}
//             onChange={(date) => setDate(date)}
//             dateFormat="MMMM d, yyyy"
//             placeholderText="Select Date"
//             className="pl-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-full md:w-1/4 cursor-pointer outline-none focus:border-yellow-400"
//           />
//         </div>

//         {/* Routes Table */}
//         <div className="mt-6 w-full max-w-2xl">
//           <table className="w-full bg-gray-800 rounded-lg shadow-lg text-white">
//             <thead>
//               <tr className="bg-yellow-400 text-gray-900">
//                 <th className="p-3">Route</th>
//                 <th className="p-3">Time</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {routes.map((route, index) => (
//                 <tr key={index} className="border-t border-gray-700">
//                   <td className="p-3">{route.route}</td>
//                   <td className="p-3">{route.time}</td>
//                   <td className="p-3">
//                     <button onClick={handleBookNow} className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-all">
//                       Book Now
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* User Verification Popup */}
//       {showForm && (
//         <div className="fixed top-0 right-0 w-96 h-full bg-gray-800 p-6 shadow-lg transition-transform duration-500 transform translate-x-0">
//           <button onClick={handleCloseForm} className="text-white text-2xl absolute top-4 right-4">
//             ✕
//           </button>
//           <h2 className="text-xl font-bold text-yellow-400 mb-4">Passenger Details</h2>
//           <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
//             <label className="text-white">Number of Passengers:</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={passengerCount}
//               onChange={handlePassengerCountChange}
//               className="p-2 bg-gray-700 text-white rounded"
//             />
//             {passengers.map((_, index) => (
//               <div key={index} className="bg-gray-700 p-3 rounded-lg">
//                 <p className="text-yellow-400">Passenger {index + 1}</p>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   required
//                   className="p-2 w-full bg-gray-600 text-white rounded mt-2"
//                   onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Age"
//                   required
//                   className="p-2 w-full bg-gray-600 text-white rounded mt-2"
//                   onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
// //                 />
//               </div>
//             ))}
//             <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-lg font-bold">
//               Confirm Booking
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

















// //------------main-------------------
// // import { useEffect, useRef, useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { FaExchangeAlt, FaSearchLocation, FaUserCircle } from "react-icons/fa";
// // import { Link, useNavigate } from "react-router-dom";
// // import Select from "react-select"; // Import react-select

// // function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [date, setDate] = useState(null);
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const cities = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];
//   const cityOptions = cities.map((city) => ({ value: city, label: city }));

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [navigate]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchCars = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://myfakeapi.com/api/cars/");
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setCars(data?.cars?.slice(0, 5) || []);
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//       alert("Failed to fetch car data. Loading sample cars.");

//       // Fallback Mock Data
//       setCars([
//         { id: 1, name: "Toyota Camry", year: 2023, make: "Toyota", model: "Camry", image: "https://via.placeholder.com/150" },
//         { id: 2, name: "Honda Civic", year: 2022, make: "Honda", model: "Civic", image: "https://via.placeholder.com/150" },
//         { id: 3, name: "Ford Mustang", year: 2024, make: "Ford", model: "Mustang", image: "https://via.placeholder.com/150" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!from || !to || !date) {
//       alert("Please select all fields!");
//       return;
//     }
//     fetchCars();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   const routes = [
//         { id: 1, route: "Pune → Mumbai", time: "10:00 AM" },
//         { id: 2, route: "Mumbai → Delhi", time: "2:00 PM" },
//         { id: 3, route: "Delhi → Bangalore", time: "6:30 AM" },
//         { id: 4, route: "Bangalore → Hyderabad", time: "9:00 PM" },
//       ];

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Navbar */}
//       <nav className="w-full fixed top-0 left-0 bg-gray-800/90 py-4 px-8 flex justify-between items-center shadow-md z-10">
//         <h1 className="text-3xl font-extrabold text-yellow-400">Travelon</h1>
//         <div className="flex items-center gap-6">
//           <Link to="/bookings" className="text-gray-300 hover:text-yellow-400 transition font-medium">
//             View Bookings
//           </Link>
//           <div className="relative" ref={dropdownRef}>
//             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white text-2xl hover:text-yellow-300">
//               <FaUserCircle />
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
//                 <button onClick={() => navigate("/profile")} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-600">
//                   My Profile
//                 </button>
//                 <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-white hover:bg-red-500">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-20">
//         <h1 className="text-5xl font-extrabold text-white">
//           Welcome, <span className="text-yellow-400">{user?.name}</span>
//         </h1>
//         <p className="mt-3 text-lg text-gray-300">Find the best rides at the best prices.</p>

//         {/* Search Form */}
//         <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center justify-center">
//           <Select
//             value={from ? { value: from, label: from } : null}
//             onChange={(selectedOption) => setFrom(selectedOption ? selectedOption.value : "")}
//             options={cityOptions.filter((city) => city.value !== to)}
//             placeholder="Select From"
//             isClearable
//             className="w-full md:w-1/4"
//             styles={{
//               control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
//               option: (base, { isFocused }) => ({
//                 ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
//               }),
//             }}
//           />
//           <FaExchangeAlt className="text-yellow-400 text-2xl" />
//           <Select
//             value={to ? { value: to, label: to } : null}
//             onChange={(selectedOption) => setTo(selectedOption ? selectedOption.value : "")}
//             options={cityOptions.filter((city) => city.value !== from)}
//             placeholder="Select To"
//             isClearable
//             className="w-full md:w-1/4"
//             styles={{
//               control: (base) => ({ ...base, backgroundColor: "#1a202c", color: "white", borderColor: "#4a5568" }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#2d3748" }),
//               option: (base, { isFocused }) => ({
//                 ...base, backgroundColor: isFocused ? "#4a5568" : "#2d3748", color: "white"
//               }),
//             }}
//           />
//           <DatePicker
//             selected={date}
//             onChange={(date) => setDate(date)}
//             dateFormat="MMMM d, yyyy"
//             placeholderText="Select Date"
//             className="pl-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-full md:w-1/4 cursor-pointer outline-none focus:border-yellow-400"
//           />
//           <button onClick={handleSearch} className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center gap-2">
//             <FaSearchLocation className="text-lg" /> Search
//           </button>
//         </div>

//         {/* Display Cars in Table Format */}
//         <div className="w-full max-w-2xl mx-auto mt-8">
//          <table className="w-full border-collapse border border-yellow-400">
//            <thead>
//              <tr className="bg-yellow-400 text-gray-900">
//                <th className="p-2 border">Route</th>
//                <th className="p-2 border">Time</th>
//                <th className="p-2 border">Book</th>
//              </tr>
//            </thead>
//            <tbody>
//              {routes.map((route) => (
//               <tr key={route.id} className="bg-gray-900">
//                 <td className="p-2 border">{route.route}</td>
//                 <td className="p-2 border">{route.time}</td>
//                 <td className="p-2 border">
//                   <button className="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold">Book Now</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;








