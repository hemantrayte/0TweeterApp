// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

// const CurrentUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   const fetchCurrentUser = async () => {
//     try {
//       const res = await api.get("/users/current-user");
//       setCurrentUser(res.data.data);
//     } catch (error) {
//       console.log("User not fetched", error);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   if (!currentUser) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-black text-gray-400 text-lg">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-black text-white min-h-screen border-x border-gray-800">
//       {/* Header */}
//       <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/70 backdrop-blur-md z-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="mr-4 text-gray-400 hover:text-white transition"
//         >
//           <FaArrowLeft size={18} />
//         </button>
//         <div>
//           <h2 className="text-xl font-bold">{currentUser.fullName}</h2>
//           <p className="text-sm text-gray-500">@{currentUser.username}</p>
//         </div>
//       </div>

//       {/* Banner */}
//       <div className="relative">
//         <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400"></div>

//         <img
//           src={
//             currentUser.avatar ||
//             `https://ui-avatars.com/api/?name=${encodeURIComponent(
//               currentUser.fullName || "U"
//             )}&background=0D8ABC&color=fff`
//           }
//           alt="avatar"
//           className="absolute bottom-0 left-4 transform translate-y-1/2 w-28 h-28 rounded-full border-4 border-black object-cover"
//         />
//       </div>

//       {/* Profile Info */}
//       <div className="mt-16 px-4">
//         <div className="flex justify-end">
//           <button
//             onClick={() => navigate("/user/update")}
//             className="border border-gray-600 text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-gray-900 transition"
//           >
//             Edit profile
//           </button>
//         </div>

//         <div className="mt-2">
//           <h1 className="text-2xl font-bold">{currentUser.fullName}</h1>
//           <p className="text-gray-500">@{currentUser.username}</p>
//           {currentUser.bio && (
//             <p className="mt-2 text-gray-300 leading-relaxed">
//               {currentUser.bio}
//             </p>
//           )}
//         </div>

//         {/* Joined Date & Stats */}
//         <div className="mt-4 text-sm text-gray-400 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-2">
//             <FaCalendarAlt size={14} />
//             <span>
//               Joined {new Date(currentUser.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>

//         <div className="mt-4 flex gap-6 text-sm">
//           <p>
//             <span className="font-semibold text-white">120</span>{" "}
//             <span className="text-gray-500">Following</span>
//           </p>
//           <p>
//             <span className="font-semibold text-white">200</span>{" "}
//             <span className="text-gray-500">Followers</span>
//           </p>
//         </div>
//       </div>

//       {/* User Tweets Placeholder */}
//       <div className="mt-6 border-t border-gray-800">
//         <p className="text-center text-gray-500 py-10">No Tweets yet</p>
//       </div>
//     </div>
//   );
// };

// export default CurrentUser;

import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import GetUserTweet from "../tweet/GetUserTweet";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-gray-400 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Top Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/70 backdrop-blur-md z-10">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white transition"
        >
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold">{currentUser.fullName}</h2>
          <p className="text-sm text-gray-500">@{currentUser.username}</p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="relative w-full">
        <div className="h-52 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        <img
          src={
            currentUser.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              currentUser.fullName || "U"
            )}&background=0D8ABC&color=fff`
          }
          alt="avatar"
          className="absolute bottom-0 left-8 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-black object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-6 sm:px-12 lg:px-24 xl:px-48">
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/user/update")}
            className="border border-gray-600 text-sm px-5 py-1.5 rounded-full font-semibold hover:bg-gray-900 transition"
          >
            Edit profile
          </button>
        </div>

        <div className="mt-3">
          <h1 className="text-2xl font-bold">{currentUser.fullName}</h1>
          <p className="text-gray-500">@{currentUser.username}</p>
          {currentUser.bio && (
            <p className="mt-2 text-gray-300 leading-relaxed">
              {currentUser.bio}
            </p>
          )}
        </div>

        {/* Joined Info */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <FaCalendarAlt size={14} />
          <span>
            Joined {new Date(currentUser.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-4 flex gap-6 text-sm">
          <p>
            <span className="font-semibold text-white">120</span>{" "}
            <span className="text-gray-500">Following</span>
          </p>
          <p>
            <span className="font-semibold text-white">200</span>{" "}
            <span className="text-gray-500">Followers</span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-gray-800"></div>

      {/* Tweets Section (Placeholder) */}
      <div className="px-6 sm:px-12 lg:px-24 xl:px-48 py-10">
        <div className="text-center text-gray-500 text-sm">
          <GetUserTweet userId={currentUser._id} />
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
