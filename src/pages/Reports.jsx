import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const reportData = {
    weekly: {
      waterUsed: 150,
      irrigations: 2,
      efficiency: 17,
      savings: 30,
      previousWaterUsed: 180,
      previousIrrigations: 3,
      recommendations: [
        "Reduced irrigation due to rainfall",
        "Optimal soil moisture maintained",
        "Water savings achieved through smart scheduling"
      ]
    },
    monthly: {
      waterUsed: 650,
      irrigations: 8,
      efficiency: 22,
      savings: 180,
      previousWaterUsed: 830,
      previousIrrigations: 12,
      recommendations: [
        "Adjusted schedule for seasonal changes",
        "Implemented moisture-based irrigation",
        "Reduced water waste by 22%"
      ]
    },
    yearly: {
      waterUsed: 7200,
      irrigations: 95,
      efficiency: 35,
      savings: 3800,
      previousWaterUsed: 11000,
      previousIrrigations: 140,
      recommendations: [
        "Annual water savings: 3,800L",
        "Smart system optimization successful",
        "Consistent efficiency improvements"
      ]
    }
  };

  const currentData = reportData[selectedPeriod];

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
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
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
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <div className="p-8 bg-green-50 min-h-screen flex items-center justify-center">
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
          <p className="text-green-700 text-lg">Loading reports...</p>
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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            Smart Irrigation Analytics
          </h1>
          <p className="text-green-600 text-lg">
            Comprehensive reports and performance insights for your irrigation system
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex">
            {["weekly", "monthly", "yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedPeriod === period
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Key Metrics Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
              <span className="mr-2">📊</span>
              Key Performance Metrics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-green-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-green-600 font-semibold">Water Used</span>
                  <span className="text-2xl font-bold text-green-700">{currentData.waterUsed}{selectedPeriod === 'yearly' ? 'L' : 'L'}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Previous: {currentData.previousWaterUsed}L
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentData.waterUsed / currentData.previousWaterUsed) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-600 font-semibold">Irrigation Sessions</span>
                  <span className="text-2xl font-bold text-blue-700">{currentData.irrigations}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Previous: {currentData.previousIrrigations}
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentData.irrigations / currentData.previousIrrigations) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-blue-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-yellow-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-yellow-600 font-semibold">Efficiency Improvement</span>
                  <span className="text-2xl font-bold text-yellow-700">+{currentData.efficiency}%</span>
                </div>
                <div className="text-sm text-gray-600">
                  Compared to previous period
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentData.efficiency}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="bg-yellow-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-purple-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-purple-600 font-semibold">Water Savings</span>
                  <span className="text-2xl font-bold text-purple-700">{currentData.savings}L</span>
                </div>
                <div className="text-sm text-gray-600">
                  Total water conserved
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentData.savings / currentData.previousWaterUsed) * 100}%` }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="bg-purple-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Efficiency Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">🌿</span>
              Efficiency Score
            </h2>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center my-8"
            >
              <div className="relative inline-block">
                <motion.div
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * currentData.efficiency) / 100 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="w-32 h-32"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 - (283 * currentData.efficiency) / 100 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{currentData.efficiency}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-lg font-semibold mb-2">Excellent Performance! 🎉</p>
              <p className="text-green-100 text-sm">
                Your irrigation system is operating {currentData.efficiency}% more efficiently than previous period
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommendations Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Smart Recommendations
            </h2>
            
            <motion.div variants={containerVariants} className="space-y-4">
              {currentData.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start p-4 bg-green-50 rounded-lg"
                >
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <p className="text-gray-700">{recommendation}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-blue-700 font-semibold flex items-center">
                <span className="mr-2">🚀</span>
                Next Step Optimization
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Consider integrating soil moisture sensors for even better water management
              </p>
            </motion.div>
          </motion.div>

          {/* Environmental Impact Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
              <span className="mr-2">🌍</span>
              Environmental Impact
            </h2>
            
            <motion.div variants={containerVariants} className="space-y-4">
              <motion.div variants={itemVariants} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-green-600">Water Conserved</span>
                <span className="font-bold text-green-700">{currentData.savings} Liters</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-blue-600">Energy Saved</span>
                <span className="font-bold text-blue-700">{Math.round(currentData.savings * 0.002)} kWh</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-purple-600">CO₂ Reduction</span>
                <span className="font-bold text-purple-700">{Math.round(currentData.savings * 0.0003)} kg</span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <p className="text-yellow-700 text-sm">
                💡 <strong>Did you know?</strong> Your water savings are equivalent to filling {Math.round(currentData.savings / 150)} standard bathtubs!
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Trend Analysis */}
        <motion.div
          variants={cardVariants}
          className="mt-6 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Performance Trend
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(reportData).map(([period, data]) => (
              <motion.div
                key={period}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl ${
                  selectedPeriod === period ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'
                }`}
              >
                <div className="text-sm text-gray-600 capitalize">{period}</div>
                <div className="text-xl font-bold text-green-700">+{data.efficiency}%</div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Reports;