// const SearchBar = ({ city, setCity, fetchWeather }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchWeather(city);
//     }
//   };

//   return (
//     <div className="flex gap-2 mb-4">
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Enter city name"
//         className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent min-w-[250px]"
//       />
//       <button
//         onClick={() => fetchWeather(city)}
//         className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;



// SearchBar.jsx
import React from 'react';

const SearchBar = ({ city, setCity, fetchWeather }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pr-12 bg-white/20 border border-white/30 rounded-lg 
                   text-white placeholder-white/70 backdrop-blur-md
                   focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent
                   transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/30 border border-white/30 
                   rounded-lg px-3 py-1.5 text-white text-sm font-medium
                   transition-all duration-200 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;