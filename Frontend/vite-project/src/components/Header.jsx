import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({
  user = null,
  onSearch = () => {},
  onNewTweet = () => {},
  onLogout = () => {},
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="hidden sm:inline font-semibold text-lg">
                Tweeter
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="px-3 py-1 rounded hover:bg-gray-100">
                Home
              </Link>
              <a
                href="/explore"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Explore
              </a>
              <a
                href="/notifications"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Notifications
              </a>
            </nav>
          </div>

          <div className="flex-1 px-4">
            <form onSubmit={submitSearch} className="max-w-xl mx-auto">
              <label htmlFor="search" className="sr-only">
                Search tweets
              </label>
              <div className="relative">
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search tweets, users..."
                  className="w-full rounded-full border border-gray-200 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          <div className="flex items-center gap-3">
            <Link
              to={"/tweet/create"}
              className="hidden sm:inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:brightness-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New
            </Link>

            <button
              onClick={onNewTweet}
              className="sm:hidden p-2 rounded-full bg-blue-500 text-white"
              aria-label="New tweet"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  <img
                    src={
                      user.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "U"
                      )}`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <Link
                      to="/user/current-user"
                      className="block px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm"
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
