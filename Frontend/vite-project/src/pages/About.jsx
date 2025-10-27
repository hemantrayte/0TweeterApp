import React from "react";
import { FaTwitter, FaUsers, FaCode, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-6 py-10">
      {/* Card */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaTwitter className="text-blue-500 text-4xl" />
          <h1 className="text-3xl font-bold">About Tweeter</h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
          <strong>Tweeter</strong> is a modern social media platform built for
          sharing thoughts, ideas, and conversations — fast, simple, and
          expressive. Connect with people, share your stories, and be part of
          trending discussions that shape the world.
        </p>

        {/* Features Section */}
        <div className="grid sm:grid-cols-3 gap-6 text-center mb-8">
          <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-sm">
            <FaUsers className="text-blue-500 text-3xl mx-auto mb-2" />
            <h3 className="font-semibold">Connect</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Follow users, make friends, and grow your community.
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-sm">
            <FaCode className="text-blue-500 text-3xl mx-auto mb-2" />
            <h3 className="font-semibold">Create</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Post tweets, reply, and express yourself freely.
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-sm">
            <FaRocket className="text-blue-500 text-3xl mx-auto mb-2" />
            <h3 className="font-semibold">Discover</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore trends, topics, and what the world is talking about.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To empower voices everywhere — giving people the freedom to
            communicate openly, creatively, and instantly.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Tweeter — Built with ❤️ by your dev team.
        </footer>
      </div>
    </div>
  );
};

export default About;
