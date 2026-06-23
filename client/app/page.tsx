'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4">
        <h1 className="text-white text-2xl font-bold">✈️ AI Travel Planner</h1>
        <div className="flex gap-4">
          <Link href="/login" className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition">
            Login
          </Link>
          <Link href="/register" className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-white text-5xl font-bold mb-6">
          Plan Your Dream Trip with AI
        </h2>
        <p className="text-blue-200 text-xl mb-10 max-w-2xl">
          Get a personalized day-by-day itinerary, budget estimation, and hotel suggestions powered by AI.
        </p>
        <Link href="/register" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition">
          Start Planning for Free 🚀
        </Link>
      </div>
    </main>
  );
}