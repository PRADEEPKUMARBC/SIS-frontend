import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SensorCard from "../components/SensorCard";
import AIAdviceCard from "../components/AIAdviceCard";
import ChartComponent from "../components/ChartComponent";
import IrrigationControl from "../components/IrrigationControl";
import WeatherForecast from "../components/WeatherForecast";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return { ref, inView };
};

function Dashboard() {
  const headerSection = useScrollAnimation();
  const sensorSection = useScrollAnimation();
  const mainSection = useScrollAnimation();

  // Essential sensor data only
  const sensorData = [
    { title: "Soil Moisture", value: "65%", optimal: "60-80%", status: "optimal", icon: "💧" },
    { title: "Temperature", value: "28°C", optimal: "25-30°C", status: "optimal", icon: "🌡️" },
    { title: "Humidity", value: "70%", optimal: "60-80%", status: "optimal", icon: "💨" }
  ];

  const weatherData = [
    { day: "Today", temp: "28°C", condition: "Sunny", rain: "0%", icon: "☀️" },
    { day: "Tomorrow", temp: "26°C", condition: "Cloudy", rain: "30%", icon: "⛅" },
    { day: "Wed", temp: "24°C", condition: "Rain", rain: "80%", icon: "🌧️" }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50"
    >
      {/* Header Section */}
      <motion.section
        ref={headerSection.ref}
        variants={containerVariants}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl lg:text-4xl font-bold text-green-700 playfair-headline">
                Farm Dashboard
              </h1>
              <p className="text-gray-600 mt-2 outfit-content">
                Monitor and control your irrigation system
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 outfit-content">Current Field</p>
                <p className="font-semibold text-green-700 montserrat-subhead">North Field - Corn</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌽</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Sensors Section */}
        <motion.section
          ref={sensorSection.ref}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-green-800 mb-8 montserrat-subhead"
          >
            Current Field Conditions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sensorData.map((sensor, index) => (
              <motion.div
                key={sensor.title}
                variants={itemVariants}
                custom={index}
              >
                <SensorCard 
                  title={sensor.title}
                  value={sensor.value}
                  optimal={sensor.optimal}
                  status={sensor.status}
                  icon={sensor.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Dashboard Grid - Simplified */}
        <motion.section
          ref={mainSection.ref}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Left Column - AI Advice & Control */}
          <motion.div variants={itemVariants} className="space-y-8">
            <AIAdviceCard 
              advice="No irrigation needed today. Rain expected tomorrow. Soil moisture levels are optimal for corn growth."
              confidence="95%"
              priority="low"
            />
            
            <IrrigationControl 
              status="auto"
              nextSchedule="Tomorrow 06:00 AM"
              duration="45 minutes"
              zone="North Field"
            />
          </motion.div>

          {/* Right Column - Weather & Quick Stats */}
          <motion.div variants={itemVariants} className="space-y-8">
            <WeatherForecast data={weatherData} />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">450L</div>
                  <div className="text-sm text-blue-800">Water Used Today</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">35%</div>
                  <div className="text-sm text-green-800">Water Saved</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">85%</div>
                  <div className="text-sm text-yellow-800">System Efficiency</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">Excellent</div>
                  <div className="text-sm text-purple-800">Crop Health</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Charts Section - Simplified */}
        <motion.section
          variants={containerVariants}
          className="mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-green-800 mb-8 montserrat-subhead"
          >
            Field Analytics
          </motion.h2>
          <div className="grid grid-cols-1 gap-8">
            <motion.div variants={itemVariants}>
              <ChartComponent 
                title="Soil Moisture Trends (Last 7 Days)"
                type="line"
                dataType="moisture"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ChartComponent 
                title="Water Usage Overview"
                type="bar"
                dataType="water"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* System Status Section */}
        <motion.section
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-green-800 mb-6 montserrat-subhead"
          >
            System Overview
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants} className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl text-green-600 mb-3">🌱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Crop Stage</h3>
              <p className="text-green-600 font-medium">Vegetative Growth</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl text-blue-600 mb-3">💧</div>
              <h3 className="font-semibold text-gray-800 mb-2">Last Watering</h3>
              <p className="text-blue-600 font-medium">24 hours ago</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-3xl text-yellow-600 mb-3">📈</div>
              <h3 className="font-semibold text-gray-800 mb-2">Productivity</h3>
              <p className="text-yellow-600 font-medium">+15% vs Last Year</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl text-purple-600 mb-3">✅</div>
              <h3 className="font-semibold text-gray-800 mb-2">System Status</h3>
              <p className="text-purple-600 font-medium">All Systems Normal</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default Dashboard;