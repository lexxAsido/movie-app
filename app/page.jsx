"use client"
import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";


export default function Home() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${query}&apikey=e9e3b8da`
      );
      if (response.data.Response === "True") {
        setMovie(response.data);
        
        
      } else {
        setError("🚨Movie not found. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
    
    
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-4 justify-center">
      <h1 className="text-3xl font-bold mb-40 underline underline-offset-8">Movie Search App</h1>
      {/* <div className="bg-gray-300 w-[32rem] h-[28rem] flex flex-col justify-center items-center shadow-xl rounded-lg"> */}

      <div className="flex  ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Your Movie Title Here......."
          className="p-2 border  text-black w-[32rem] outline-none"
          />
        <button
          onClick={fetchMovie}
          className="px-4 py-2 bg-blue-500  hover:bg-blue-700"
          >
        <FaSearch />
        </button>
      </div>
      {loading && <FiLoader className="mt-5 animate-spin text-3xl"/>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {movie && (
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg max-w-md border text-black shadow-white">
          <img src={movie.Poster} alt={movie.Title} className="w-full rounded-md flex justify-center cursor-pointer hover:scale-95" />
          <h2 className="text-2xl font-bold mt-2">{movie.Title}</h2>
          <p>Release Date: {movie.Released}</p>
          <p className="flex items-center">Rating <IoIosStar className="text-yellow-500" />: {movie.imdbRating}</p>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
