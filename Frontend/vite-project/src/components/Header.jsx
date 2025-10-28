// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../Api/api";

// const Header = ({ onSearch = () => {} }) => {
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const submitSearch = (e) => {
//     e.preventDefault();
//     onSearch(query.trim());
//   };

//   const fetchCurrentUser = async () => {
//     try {
//       const res = await api.get("/users/current-user");
//       setUser(res.data.data);
//     } catch (error) {
//       console.log("User not fetched", error);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* === Logo + Nav === */}
//           <div className="flex items-center gap-6">
//             <Link
//               to="/"
//               className="flex items-center gap-3 select-none hover:opacity-80 transition"
//             >
//               <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
//                 T
//               </div>
//               <span className="hidden sm:inline font-bold text-xl text-gray-800">
//                 Tweeter
//               </span>
//             </Link>

//             {user && (
//               <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
//                 <Link
//                   to="/"
//                   className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/explore"
//                   className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
//                 >
//                   Explore
//                 </Link>
//                 <Link
//                   to="/notifications"
//                   className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
//                 >
//                   Notifications
//                 </Link>
//               </nav>
//             )}
//           </div>

//           {/* === Search Bar === */}
//           <div className="flex-1 max-w-md hidden sm:block">
//             <form onSubmit={submitSearch}>
//               <div className="relative">
//                 <input
//                   id="search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   type="search"
//                   placeholder="Search Tweeter"
//                   className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-1.35z"
//                   />
//                 </svg>
//               </div>
//             </form>
//           </div>

//           {/* === Right Section === */}
//           <div className="flex items-center gap-3">
//             {user ? (
//               <>
//                 <Link
//                   to="/tweet/create"
//                   className="hidden sm:inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition shadow-sm"
//                 >
//                   Tweet
//                 </Link>

//                 {/* Avatar Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setOpen(!open)}
//                     className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition"
//                   >
//                     <img
//                       src={
//                         user.avatarUrl ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           user.name || "U"
//                         )}&background=0D8ABC&color=fff`
//                       }
//                       alt="avatar"
//                       className="w-9 h-9 rounded-full object-cover border border-gray-200"
//                     />
//                   </button>

//                   {open && (
//                     <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
//                       <Link
//                         to="/user/current-user"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Profile
//                       </Link>
//                       <Link
//                         to={"/log-out"}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Link
//                   to="/login"
//                   className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Api/api";

const Header = ({ onSearch = () => {} }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Fetch current user if token exists
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return; // skip if not logged in

    try {
      const res = await api.get("/users/current-user");
      setUser(res.data.data);
    } catch (error) {
      console.error("❌ User fetch failed:", error.response?.data || error);
      // Token invalid → clear and redirect to login
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  // ✅ Handle logout cleanly

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* === Logo + Nav === */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-3 select-none hover:opacity-80 transition"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                T
              </div>
              <span className="hidden sm:inline font-bold text-xl text-gray-800">
                Tweeter
              </span>
            </Link>

            {user && (
              <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
                >
                  Explore
                </Link>
                <Link
                  to="/notifications"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition"
                >
                  Notifications
                </Link>
              </nav>
            )}
          </div>

          {/* === Search Bar === */}
          <div className="flex-1 max-w-md hidden sm:block">
            <form onSubmit={submitSearch}>
              <div className="relative">
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search Tweeter"
                  className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-1.35z"
                  />
                </svg>
              </div>
            </form>
          </div>

          {/* === Right Section === */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/tweet/create"
                  className="hidden sm:inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition shadow-sm"
                >
                  Tweet
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition"
                  >
                    <img
                      src={
                        user.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "U"
                        )}&background=0D8ABC&color=fff`
                      }
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      <Link
                        to="/user/current-user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to={"/log-out"}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
