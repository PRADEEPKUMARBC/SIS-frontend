import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

function Weather() {
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherMode, setWeatherMode] = useState(""); // "forecast" or "history"
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState({ lat: 14.4667, lng: 75.9167 }); // Default: Davanagere coordinates
//   const locations = [
//   { city: "Bengaluru", lat: 12.9716, lng: 77.5946 },
//   { city: "Mysuru", lat: 12.2958, lng: 76.6394 },
//   { city: "Davanagere", lat: 14.4667, lng: 75.9167 },
//   { city: "Hubli", lat: 15.3647, lng: 75.1235 },
//   { city: "Mangalore", lat: 12.9141, lng: 74.8560 },
//   { city: "Belagavi", lat: 15.8497, lng: 74.4977 },
//   { city: "Tumakuru", lat: 13.3409, lng: 77.1110 },
//   { city: "Kalaburagi", lat: 17.3297, lng: 76.8343 },
//   { city: "Shimoga", lat: 13.9299, lng: 75.5681 },
//   { city: "Davangere", lat: 14.4667, lng: 75.9167 }
// ];

  const [cityInput, setCityInput] = useState(""); // City search input
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Function to get coordinates from city name
  const getCoordinatesFromCity = async (cityName) => {
    try {
      setIsSearching(true);
      
      // Simple geocoding for demo
      const cityCoordinates = {
        "mumbai": { lat: 19.0760, lng: 72.8777, name: "Mumbai, India" },
        "delhi": { lat: 28.6139, lng: 77.2090, name: "Delhi, India" },
        "bengaluru": { lat: 12.9716, lng: 77.5946, name: "Bengaluru, India" },
        "chennai": { lat: 13.0827, lng: 80.2707, name: "Chennai, India" },
        "kolkata": { lat: 22.5726, lng: 88.3639, name: "Kolkata, India" },
        "hyderabad": { lat: 17.3850, lng: 78.4867, name: "Hyderabad, India" },
        "pune": { lat: 18.5204, lng: 73.8567, name: "Pune, India" },
        "ahmedabad": { lat: 23.0225, lng: 72.5714, name: "Ahmedabad, India" },
        "jaipur": { lat: 26.9124, lng: 75.7873, name: "Jaipur, India" },
        "lucknow": { lat: 26.8467, lng: 80.9462, name: "Lucknow, India" },
        "dharwad": { lat: 15.4589, lng: 75.0078, name: "Dharwad, India" },
        "london": { lat: 51.5074, lng: -0.1278, name: "London, UK" },
        "new york": { lat: 40.7128, lng: -74.0060, name: "New York, USA" },
        "tokyo": { lat: 35.6762, lng: 139.6503, name: "Tokyo, Japan" },
        "paris": { lat: 48.8566, lng: 2.3522, name: "Paris, France" },
        "sydney": { lat: -33.8688, lng: 151.2093, name: "Sydney, Australia" },
        "dubai": { lat: 25.2048, lng: 55.2708, name: "Dubai, UAE" },
        "singapore": { lat: 1.3521, lng: 103.8198, name: "Singapore" }
      };

      const normalizedCityName = cityName.toLowerCase().trim();
      
      if (cityCoordinates[normalizedCityName]) {
        return cityCoordinates[normalizedCityName];
      } else {
        // Fallback to default location
        return {
          lat: 15.4589,
          lng: 75.0078,
          name: `${cityName} (Using Dharwad data)`
        };
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      throw new Error("Could not find the specified city");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle city search
  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    try {
      setIsSearching(true);
      toast.loading(`Searching for ${cityInput}...`);
      
      const coordinates = await getCoordinatesFromCity(cityInput);
      setLocation({ lat: coordinates.lat, lng: coordinates.lng });
      
      // Fetch weather data for the new location
      await fetchWeatherData(coordinates.lat, coordinates.lng);
      
      setCityInput(""); // Clear input after search
      toast.success(`Weather data for ${coordinates.name} loaded!`);
    } catch (error) {
      console.error("City search error:", error);
      toast.error(error.message || "Failed to find the specified city");
    } finally {
      setIsSearching(false);
      toast.dismiss();
    }
  };

  const fetchWeatherData = async (customLat = null, customLng = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const lat = customLat || location.lat;
      const lng = customLng || location.lng;

      // Try to get weather data from backend
      const response = await axios.get('/api/weather/current', {
        params: {
          lat: lat,
          lng: lng
        }
      });

      if (response.data.success) {
        setData(response.data.weather);
        if (!customLat) {
          toast.success("Weather data loaded successfully!");
        }
      } else {
        throw new Error(response.data.message || "Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Weather API error:", err);
      
      // If API fails, use mock data for demo
      console.log("Using mock weather data for demo");
      setData(getMockWeatherData(customLat || location.lat, customLng || location.lng));
      toast.success("Demo weather data loaded!");
      
    } finally {
      setLoading(false);
    }
  };

  // Mock weather data for demo
  const getMockWeatherData = (lat, lng) => {
    const cities = {
      "15.4589,75.0078": { city: "Dharwad", country: "India" },
      "19.0760,72.8777": { city: "Mumbai", country: "India" },
      "28.6139,77.2090": { city: "Delhi", country: "India" },
      "12.9716,77.5946": { city: "Bengaluru", country: "India" }
    };
    
    const locationKey = `${lat},${lng}`;
    const locationInfo = cities[locationKey] || { city: "Unknown City", country: "Unknown Country" };
    
    return {
      location: locationInfo,
      current: {
        temperature: Math.round(20 + Math.random() * 15), // 20-35°C
        feelsLike: Math.round(20 + Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 40), // 40-80%
        pressure: Math.round(1000 + Math.random() * 50), // 1000-1050 hPa
        windSpeed: (Math.random() * 10).toFixed(1), // 0-10 m/s
        condition: ["Clear", "Clouds", "Rain", "Drizzle"][Math.floor(Math.random() * 4)],
        description: ["clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain", "rain", "thunderstorm", "snow", "mist"][Math.floor(Math.random() * 9)],
        visibility: Math.round(5 + Math.random() * 5), // 5-10 km
        cloudiness: Math.round(Math.random() * 100), // 0-100%
        rainfall: Math.round(Math.random() * 10), // 0-10 mm
        sunrise: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
        sunset: Date.now() + 4 * 60 * 60 * 1000 // 4 hours from now
      }
    };
  };

  const fetchWeatherForecast = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/weather/forecast', {
        params: {
          lat: location.lat,
          lng: location.lng
        }
      });

      if (response.data.success) {
        toast.success("Weather forecast loaded!");
        return response.data.forecast;
      }
    } catch (err) {
      console.error("Forecast API error:", err);
      // Return mock forecast data
      return [
        { date: "Tomorrow", temp: 25, condition: "Sunny" },
        { date: "Day 2", temp: 27, condition: "Cloudy" },
        { date: "Day 3", temp: 23, condition: "Rain" },
        { date: "Day 4", temp: 26, condition: "Clear" },
        { date: "Day 5", temp: 24, condition: "Partly Cloudy" }
      ];
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherHistory = async (days = 7) => {
    try {
      const response = await axios.get('/api/weather/history', {
        params: {
          lat: location.lat,
          lng: location.lng,
          days: days
        }
      });

      if (response.data.success) {
        toast.success("Weather history loaded!");
        return response.data.weatherHistory;
      }
    } catch (err) {
      console.error("History API error:", err);
      // Return mock history data
      return [
        { date: "1 day ago", temp: 26, condition: "Sunny" },
        { date: "2 days ago", temp: 24, condition: "Cloudy" },
        { date: "3 days ago", temp: 22, condition: "Rain" },
        { date: "4 days ago", temp: 25, condition: "Clear" },
        { date: "5 days ago", temp: 27, condition: "Sunny" },
        { date: "6 days ago", temp: 23, condition: "Rain" },
        { date: "7 days ago", temp: 26, condition: "Partly Cloudy" }
      ];
    }
  };

  // Calculate irrigation recommendations based on weather data
  const getIrrigationRecommendation = () => {
    if (!data || !data.current) return null;
    
    const { temperature, humidity } = data.current;
    const windSpeed = data.current.windSpeed;
    const weatherMain = data.current.condition;
    const rainfall = data.current.rainfall || 0;
    
    // Enhanced irrigation logic
    if (weatherMain.toLowerCase().includes("rain") || rainfall > 5) {
      return { 
        recommendation: "No irrigation needed - significant rainfall expected", 
        level: "low",
        icon: "🌧️",
        details: "Rainfall will provide sufficient moisture"
      };
    } else if (temperature > 30 && humidity < 40 && windSpeed > 10) {
      return { 
        recommendation: "High irrigation recommended - hot, dry, and windy conditions", 
        level: "high",
        icon: "🔥",
        details: "High evaporation rate due to temperature and wind"
      };
    } else if (temperature > 28 && humidity < 50) {
      return { 
        recommendation: "Moderate to high irrigation - hot and dry conditions", 
        level: "medium-high",
        icon: "☀️",
        details: "Increased water requirement due to heat"
      };
    } else if (temperature > 25 && windSpeed > 15) {
      return { 
        recommendation: "Moderate irrigation - windy conditions increase evaporation", 
        level: "medium",
        icon: "💨",
        details: "Wind accelerates moisture loss from soil"
      };
    } else if (humidity > 70) {
      return { 
        recommendation: "Reduced irrigation - high humidity reduces evaporation", 
        level: "low",
        icon: "💧",
        details: "High humidity slows down evaporation rates"
      };
    } else if (temperature < 15) {
      return { 
        recommendation: "Minimal irrigation - cool temperatures reduce water needs", 
        level: "very-low",
        icon: "❄️",
        details: "Reduced evaporation in cooler conditions"
      };
    } else {
      return { 
        recommendation: "Normal irrigation schedule", 
        level: "normal",
        icon: "✅",
        details: "Standard irrigation based on current conditions"
      };
    }
  };

  const handleRefresh = () => {
    fetchWeatherData();
  };

  const irrigationInfo = getIrrigationRecommendation();

  // Animation variants
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

  if (loading && !data) {
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header with City Search - MOVED OUTSIDE OF CONDITIONAL RENDERING */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-4xl font-bold text-green-800">
              Smart Irrigation Weather Dashboard
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="bg-green-600 text-center text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span>🔄</span>
              Refresh
            </motion.button>
          </div>
          
          {/* City Search Form - ALWAYS VISIBLE */}
          <motion.form 
            onSubmit={handleCitySearch}
            className="max-w-2xl mx-auto mb-4 "
            variants={itemVariants}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name (e.g., Mumbai, Delhi, Bengaluru, London)"
                className="flex-1 max-w-md p-3 border border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white text-black"
                disabled={isSearching}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSearching || !cityInput.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Searching...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Search
                  </>
                )}
              </motion.button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Try: Mumbai, Delhi, Bengaluru, London, New York, etc.
            </p>
          </motion.form>

          <p className="text-green-600 text-lg">
            Real-time weather data for optimal irrigation planning
          </p>
          {data && data.location && (
            <p className="text-green-700 font-semibold mt-2">
              📍 {data.location.city}, {data.location.country}
            </p>
          )}
        </motion.div>

        {/* Error Message - Show if there's an error and no data */}
        {error && !data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto text-center mb-6"
          >
            <p className="text-lg font-semibold mb-2">Weather Data Unavailable</p>
            <p className="mb-4">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchWeatherData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Weather Data Display */}
        <AnimatePresence>
          {data && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Current Weather Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Current Weather
                </h2>
                
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-6xl"
                  >
                    {data.current.temperature}°C
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-right"
                  >
                    <div className="text-3xl mb-1">
                      {data.current.condition === "Clear" && "☀️"}
                      {data.current.condition === "Clouds" && "☁️"}
                      {data.current.condition === "Rain" && "🌧️"}
                      {data.current.condition === "Drizzle" && "🌦️"}
                      {data.current.condition === "Thunderstorm" && "⛈️"}
                      {data.current.condition === "Snow" && "❄️"}
                      {data.current.condition === "Mist" || data.current.condition === "Fog" ? "🌫️" : "🌈"}
                    </div>
                    <p className="text-gray-600 capitalize">
                      {data.current.description}
                    </p>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Feels Like</p>
                    <p className="font-semibold">{data.current.feelsLike}°C</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Humidity</p>
                    <p className="font-semibold">{data.current.humidity}%</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600">Wind Speed</p>
                    <p className="font-semibold">{data.current.windSpeed} m/s</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">Rainfall</p>
                    <p className="font-semibold">{data.current.rainfall || 0} mm</p>
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
                    <span className="font-semibold">{data.current.pressure} hPa</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Wind Speed</span>
                    <span className="font-semibold">{data.current.windSpeed} m/s</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Visibility</span>
                    <span className="font-semibold">{data.current.visibility} km</span>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Cloudiness</span>
                    <span className="font-semibold">{data.current.cloudiness}%</span>
                  </motion.div>

                  {data.current.sunrise && (
                    <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-600">Sunrise</span>
                      <span className="font-semibold">
                        {new Date(data.current.sunrise).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  )}

                  {data.current.sunset && (
                    <motion.div variants={itemVariants} className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="text-gray-600">Sunset</span>
                      <span className="font-semibold">
                        {new Date(data.current.sunset).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Smart Irrigation Recommendation */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="lg:col-span-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
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
                  <p className="text-white text-opacity-90 mb-4">{irrigationInfo?.details}</p>
                  <div className={`inline-block px-4 py-2 rounded-full ${
                    irrigationInfo?.level === 'high' || irrigationInfo?.level === 'medium-high' ? 'bg-red-400' : 
                    irrigationInfo?.level === 'medium' ? 'bg-yellow-400' : 
                    irrigationInfo?.level === 'low' ? 'bg-green-400' : 'bg-blue-400'
                  }`}>
                    <span className="font-semibold">
                      {irrigationInfo?.level?.toUpperCase().replace('-', ' ')} IRRIGATION LEVEL
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                >
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">🌡️</div>
                    <p className="text-sm">Temperature: {data.current.temperature}°C</p>
                    <p className="text-xs opacity-90">Affects evaporation rates</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">💧</div>
                    <p className="text-sm">Humidity: {data.current.humidity}%</p>
                    <p className="text-xs opacity-90">Influences water requirements</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <div className="text-2xl mb-2">🌬️</div>
                    <p className="text-sm">Wind: {data.current.windSpeed} m/s</p>
                    <p className="text-xs opacity-90">Increases evaporation</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Additional Features */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">Additional Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const data = await fetchWeatherForecast();
                      setWeatherData(data);
                      setWeatherMode("forecast");
                    }}
                    className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">📅</div>
                    <p className="font-semibold">5-Day Forecast</p>
                    <p className="text-sm">View upcoming weather patterns</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const data = await fetchWeatherHistory(7);
                      setWeatherData(data);
                      setWeatherMode("history");
                    }}
                    className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">📊</div>
                    <p className="font-semibold">Weather History</p>
                    <p className="text-sm">Analyze past 7 days data</p>
                  </motion.button>
                </div>

                {/* Weather Display */}
                {weatherMode && (
                  <div className="relative bg-gray-50 p-4 rounded-lg shadow-inner">
                    {/* Close Button */}
                    <button
                      onClick={() => setWeatherMode("")}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
                    >
                      ×
                    </button>

                    {weatherMode === "forecast" && (
                      <div>
                        <h3 className="text-lg font-bold mb-2">5-Day Forecast</h3>
                        {weatherData.length === 0 && <p>No data available.</p>}
                        {weatherData.map((day, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border-b">
                            <span>{day.date}</span>
                            <span>{day.temp}°C</span>
                            <span>{day.condition}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {weatherMode === "history" && (
                      <div>
                        <h3 className="text-lg font-bold mb-2">Past 7 Days Weather</h3>
                        {weatherData.length === 0 && <p>No data available.</p>}
                        {weatherData.map((day, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border-b">
                            <span>{day.date}</span>
                            <span>{day.temp}°C</span>
                            <span>{day.condition}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!weatherMode && <p className="text-gray-500">Click a button above to view weather data.</p>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Weather;