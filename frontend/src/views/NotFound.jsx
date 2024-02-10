import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white py-48">
        <div className="flex flex-col">
          <span className="text-center font-bold my-10 opacity-30">
            <hr className="my-4" />
            <h1>Oups!</h1>
            <a
              href="https://egoistdeveloper.github.io/twcss-to-sass-playground/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
            </a>
          </span>

          <div className="flex flex-col items-center">
            <div className="text-indigo-500 font-bold text-7xl">404


            <Link to="/Home">
  <button className="w-full flex items-center px-4 py-5 space-x-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
    <span className="text-sm text-gray-700">Retour</span>
  </button>
</Link></div>

            <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
              This page does not exist
            </div>

            <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
              The page you are looking for could not be found.


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
