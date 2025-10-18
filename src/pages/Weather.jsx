// import { useEffect, useState } from "react";

// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// function Weather() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         // Replace YOUR_API_KEY with your actual OpenWeatherMap API key
//         const res = await axios.get(
//           "https://api.openweathermap.org/data/2.5/weather?q=Dharwad&appid=YOUR_API_KEY&units=metric"
//         );
//         setData(res.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch weather data");
//         console.error("Weather API error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWeather();
//   }, []);

//   // Calculate irrigation recommendations based on weather data
//   const getIrrigationRecommendation = () => {
//     if (!data) return null;
    
//     const { temp, humidity } = data.main;
//     const { speed: windSpeed } = data.wind;
//     const weatherMain = data.weather[0].main;
    
//     // Simple irrigation logic
//     if (weatherMain === "Rain") {
//       return { 
//         recommendation: "No irrigation needed - rain expected", 
//         level: "low",
//         icon: "🌧️"
//       };
//     } else if (temp > 30 && humidity < 40) {
//       return { 
//         recommendation: "High irrigation recommended - hot and dry conditions", 
//         level: "high",
//         icon: "🔥"
//       };
//     } else if (temp > 25 && windSpeed > 15) {
//       return { 
//         recommendation: "Moderate irrigation - windy conditions increase evaporation", 
//         level: "medium",
//         icon: "💨"
//       };
//     } else if (humidity > 70) {
//       return { 
//         recommendation: "Reduced irrigation - high humidity reduces evaporation", 
//         level: "low",
//         icon: "💧"
//       };
//     } else {
//       return { 
//         recommendation: "Normal irrigation schedule", 
//         level: "medium",
//         icon: "✅"
//       };
//     }
//   };

//   const irrigationInfo = getIrrigationRecommendation();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10
//       }
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 bg-green-50 min-h-screen text-center flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center"
//         >
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
//           />
//           <p className="text-green-700 text-lg">Loading weather data...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 bg-green-50 min-h-screen text-center flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg"
//         >
//           <p className="text-lg font-semibold">{error}</p>
//           <p className="mt-2">Please check your API key and try again.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Header */}
//         <motion.div variants={itemVariants} className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-green-800 mb-3">
//             Smart Irrigation Weather Dashboard
//           </h1>
//           <p className="text-green-600 text-lg">
//             Real-time weather data for optimal irrigation planning
//           </p>
//         </motion.div>

//         <AnimatePresence>
//           {data && (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 md:grid-cols-2 gap-6"
//             >
//               {/* Current Weather Card */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover="hover"
//                 className="bg-white rounded-2xl shadow-lg p-6"
//               >
//                 <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
//                   <span className="mr-2">📍</span>
//                   {data.name} - Current Weather
//                 </h2>
                
//                 <div className="flex items-center justify-between mb-4">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.5, type: "spring" }}
//                     className="text-6xl"
//                   >
//                     {data.main.temp}°C
//                   </motion.div>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.7 }}
//                     className="text-right"
//                   >
//                     <div className="text-3xl mb-1">
//                       {data.weather[0].main === "Clear" && "☀️"}
//                       {data.weather[0].main === "Clouds" && "☁️"}
//                       {data.weather[0].main === "Rain" && "🌧️"}
//                       {data.weather[0].main === "Drizzle" && "🌦️"}
//                       {data.weather[0].main === "Thunderstorm" && "⛈️"}
//                       {data.weather[0].main === "Snow" && "❄️"}
//                       {data.weather[0].main === "Mist" && "🌫️"}
//                     </div>
//                     <p className="text-gray-600 capitalize">
//                       {data.weather[0].description}
//                     </p>
//                   </motion.div>
//                 </div>

//                 <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
//                   <div className="text-center p-3 bg-green-50 rounded-lg">
//                     <p className="text-sm text-green-600">Feels Like</p>
//                     <p className="font-semibold">{data.main.feels_like}°C</p>
//                   </div>
//                   <div className="text-center p-3 bg-blue-50 rounded-lg">
//                     <p className="text-sm text-blue-600">Humidity</p>
//                     <p className="font-semibold">{data.main.humidity}%</p>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Weather Details Card */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover="hover"
//                 className="bg-white rounded-2xl shadow-lg p-6"
//               >
//                 <h2 className="text-2xl font-bold text-blue-700 mb-4">Weather Details</h2>
                
//                 <motion.div variants={containerVariants} className="space-y-4">
//                   <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Pressure</span>
//                     <span className="font-semibold">{data.main.pressure} hPa</span>
//                   </motion.div>
                  
//                   <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Wind Speed</span>
//                     <span className="font-semibold">{data.wind.speed} m/s</span>
//                   </motion.div>
                  
//                   <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Visibility</span>
//                     <span className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</span>
//                   </motion.div>
                  
//                   <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Min/Max Temp</span>
//                     <span className="font-semibold">{data.main.temp_min}° / {data.main.temp_max}°</span>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               {/* Smart Irrigation Recommendation */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover="hover"
//                 className="md:col-span-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
//               >
//                 <h2 className="text-2xl font-bold mb-4 flex items-center">
//                   <span className="mr-2">💡</span>
//                   Smart Irrigation Recommendation
//                 </h2>
                
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="text-center py-4"
//                 >
//                   <div className="text-4xl mb-3">{irrigationInfo.icon}</div>
//                   <p className="text-xl font-semibold mb-2">{irrigationInfo.recommendation}</p>
//                   <div className={`inline-block px-4 py-2 rounded-full ${
//                     irrigationInfo.level === 'high' ? 'bg-red-400' : 
//                     irrigationInfo.level === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
//                   }`}>
//                     <span className="font-semibold">
//                       {irrigationInfo.level.toUpperCase()} IRRIGATION LEVEL
//                     </span>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   variants={containerVariants}
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
//                 >
//                   <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
//                     <div className="text-2xl mb-2">🌡️</div>
//                     <p className="text-sm">Temperature affects evaporation rates</p>
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
//                     <div className="text-2xl mb-2">💧</div>
//                     <p className="text-sm">Humidity influences water requirements</p>
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
//                     <div className="text-2xl mb-2">🌬️</div>
//                     <p className="text-sm">Wind speed increases evaporation</p>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }

// export default Weather;


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  // Mock weather data for demonstration
  const mockWeatherData = {
    name: "Dharwad",
    main: {
      temp: 28,
      feels_like: 30,
      humidity: 65,
      pressure: 1013,
      temp_min: 26,
      temp_max: 32
    },
    weather: [
      {
        main: "Clouds",
        description: "scattered clouds"
      }
    ],
    wind: {
      speed: 3.5
    },
    visibility: 10000
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
        
        // If no API key or demo mode, use mock data
        if (!API_KEY || API_KEY === "your_actual_api_key_here" || useMockData) {
          setTimeout(() => {
            setData(mockWeatherData);
            setError(null);
            setLoading(false);
          }, 1500);
          return;
        }

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Dharwad&appid=${API_KEY}&units=metric`
        );
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error("Weather API error:", err);
        // Fallback to mock data
        setTimeout(() => {
          setData(mockWeatherData);
          setError("Using demo data - Configure API key for real-time data");
          setLoading(false);
        }, 1500);
      }
    };
    fetchWeather();
  }, [useMockData]);

  // Calculate irrigation recommendations based on weather data
  const getIrrigationRecommendation = () => {
    if (!data) return null;
    
    const { temp, humidity } = data.main;
    const { speed: windSpeed } = data.wind;
    const weatherMain = data.weather[0].main;
    
    // Simple irrigation logic
    if (weatherMain === "Rain") {
      return { 
        recommendation: "No irrigation needed - rain expected", 
        level: "low",
        icon: "🌧️"
      };
    } else if (temp > 30 && humidity < 40) {
      return { 
        recommendation: "High irrigation recommended - hot and dry conditions", 
        level: "high",
        icon: "🔥"
      };
    } else if (temp > 25 && windSpeed > 15) {
      return { 
        recommendation: "Moderate irrigation - windy conditions increase evaporation", 
        level: "medium",
        icon: "💨"
      };
    } else if (humidity > 70) {
      return { 
        recommendation: "Reduced irrigation - high humidity reduces evaporation", 
        level: "low",
        icon: "💧"
      };
    } else {
      return { 
        recommendation: "Normal irrigation schedule", 
        level: "medium",
        icon: "✅"
      };
    }
  };

  const irrigationInfo = getIrrigationRecommendation();

  // Animation variants (same as before)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-green-50 min-h-screen text-center flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
          />
          <p className="text-green-700 text-lg">Loading weather data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Demo Mode Notice */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <strong>Demo Mode:</strong> {error}
            </div>
            <button
              onClick={() => setUseMockData(false)}
              className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
            >
              Retry Real Data
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            Smart Irrigation Weather Dashboard
          </h1>
          <p className="text-green-600 text-lg">
            Real-time weather data for optimal irrigation planning
          </p>
        </motion.div>

        <AnimatePresence>
          {data && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Current Weather Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  {data.name} - Current Weather
                </h2>
                
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-6xl"
                  >
                    {data.main.temp}°C
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-right"
                  >
                    <div className="text-3xl mb-1">
                      {data.weather[0].main === "Clear" && "☀️"}
                      {data.weather[0].main === "Clouds" && "☁️"}
                      {data.weather[0].main === "Rain" && "🌧️"}
                      {data.weather[0].main === "Drizzle" && "🌦️"}
                      {data.weather[0].main === "Thunderstorm" && "⛈️"}
                      {data.weather[0].main === "Snow" && "❄️"}
                      {data.weather[0].main === "Mist" && "🌫️"}
                    </div>
                    <p className="text-gray-600 capitalize">
                      {data.weather[0].description}
                    </p>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Feels Like</p>
                    <p className="font-semibold">{data.main.feels_like}°C</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Humidity</p>
                    <p className="font-semibold">{data.main.humidity}%</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Weather Details Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Weather Details</h2>
                
                <motion.div variants={containerVariants} className="space-y-4">
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Pressure</span>
                    <span className="font-semibold">{data.main.pressure} hPa</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Wind Speed</span>
                    <span className="font-semibold">{data.wind.speed} m/s</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Visibility</span>
                    <span className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Min/Max Temp</span>
                    <span className="font-semibold">{data.main.temp_min}° / {data.main.temp_max}°</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Smart Irrigation Recommendation */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="md:col-span-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">💡</span>
                  Smart Irrigation Recommendation
                </h2>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-3">{irrigationInfo?.icon}</div>
                  <p className="text-xl font-semibold mb-2">{irrigationInfo?.recommendation}</p>
                  <div className={`inline-block px-4 py-2 rounded-full ${
                    irrigationInfo?.level === 'high' ? 'bg-red-400' : 
                    irrigationInfo?.level === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}>
                    <span className="font-semibold">
                      {irrigationInfo?.level?.toUpperCase()} IRRIGATION LEVEL
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                >
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">🌡️</div>
                    <p className="text-sm">Temperature affects evaporation rates</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">💧</div>
                    <p className="text-sm">Humidity influences water requirements</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">🌬️</div>
                    <p className="text-sm">Wind speed increases evaporation</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* API Setup Instructions */}
              <motion.div
                variants={cardVariants}
                className="md:col-span-2 bg-gray-100 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Real Weather Data</h2>
                <div className="text-gray-600 space-y-3">
                  <p>To get real-time weather data:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Sign up at <a href="https://openweathermap.org/api" className="text-blue-600 underline">OpenWeatherMap</a></li>
                    <li>Get your free API key</li>
                    <li>Create a <code>.env</code> file in your project root</li>
                    <li>Add: <code>REACT_APP_OPENWEATHER_API_KEY=your_api_key_here</code></li>
                    <li>Restart your development server</li>
                  </ol>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Weather;