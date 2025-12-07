"use client";

import { useState } from "react";

export default function PortalHomePage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`ID: ${id} | Name: ${name}`);
  };

  return (
    <div className="h-screen w-full bg-blue-50 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Portal Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            placeholder="Enter your ID"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            placeholder="Enter your Name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
