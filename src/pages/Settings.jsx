import { motion, AnimatePresence  } from "framer-motion";
import { useState, useEffect } from "react";

function Settings() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("connection");
  const [formData, setFormData] = useState({
    deviceId: "",
    deviceName: "",
    fieldSize: "",
    cropType: "",
    soilType: "loam",
    irrigationDuration: 30,
    moistureThreshold: 60,
    automation: true,
    notifications: true
  });

  // Mock connected devices
  const mockDevices = [
    {
      id: "IRR-001",
      name: "Main Field Sensor",
      status: "connected",
      battery: 85,
      lastSeen: "2 minutes ago",
      signal: "excellent"
    },
    {
      id: "IRR-002",
      name: "North Section",
      status: "connected",
      battery: 45,
      lastSeen: "5 minutes ago",
      signal: "good"
    },
    {
      id: "IRR-003",
      name: "Greenhouse Unit",
      status: "disconnected",
      battery: 0,
      lastSeen: "3 days ago",
      signal: "poor"
    }
  ];

  const cropTypes = [
    "Wheat", "Corn", "Rice", "Cotton", "Soybean", 
    "Vegetables", "Fruits", "Flowers", "Pasture", "Other"
  ];

  const soilTypes = [
    { value: "sand", label: "Sandy Soil", description: "Fast drainage" },
    { value: "loam", label: "Loam Soil", description: "Well balanced" },
    { value: "clay", label: "Clay Soil", description: "Slow drainage" },
    { value: "silt", label: "Silt Soil", description: "Moisture retentive" }
  ];

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

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    // Simulate loading devices
    const timer = setTimeout(() => {
      setDevices(mockDevices);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleConnectDevice = () => {
    if (!formData.deviceId) {
      alert("Please enter a Device ID");
      return;
    }

    const newDevice = {
      id: formData.deviceId,
      name: formData.deviceName || `Device ${formData.deviceId}`,
      status: "connected",
      battery: Math.floor(Math.random() * 100),
      lastSeen: "Just now",
      signal: "excellent"
    };

    setDevices(prev => [newDevice, ...prev]);
    setFormData(prev => ({ ...prev, deviceId: "", deviceName: "" }));
    
    // Show success animation
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case "excellent": return "📶";
      case "good": return "📶";
      case "fair": return "📶";
      case "poor": return "📵";
      default: return "❓";
    }
  };

  const getBatteryIcon = (level) => {
    if (level >= 80) return "🔋";
    if (level >= 60) return "🔋";
    if (level >= 40) return "🔋";
    if (level >= 20) return "🪫";
    return "🪫";
  };

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
          <p className="text-green-700 text-lg">Loading settings...</p>
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
            Smart Irrigation Settings
          </h1>
          <p className="text-green-600 text-lg">
            Configure your IoT devices and optimize irrigation parameters
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "connection", label: "Device Connection", icon: "🔗" },
            { id: "configuration", label: "Field Configuration", icon: "⚙️" },
            { id: "automation", label: "Automation", icon: "🤖" },
            { id: "devices", label: "Connected Devices", icon: "📱" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:text-green-600"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Device Connection Tab */}
          {activeTab === "connection" && (
            <motion.div
              key="connection"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                  <span className="mr-2">🔗</span>
                  Connect New Device
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Device ID *
                    </label>
                    <input
                      type="text"
                      name="deviceId"
                      value={formData.deviceId}
                      onChange={handleInputChange}
                      placeholder="Enter Device ID (e.g., IRR-001)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Device Name
                    </label>
                    <input
                      type="text"
                      name="deviceName"
                      value={formData.deviceName}
                      onChange={handleInputChange}
                      placeholder="Give your device a name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConnectDevice}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Connect Device
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                  <span className="mr-2">📋</span>
                  Connection Guide
                </h2>

                <div className="space-y-4">
                  <motion.div variants={itemVariants} className="flex items-start p-4 bg-blue-50 rounded-lg">
                    <span className="text-blue-500 text-2xl mr-3">1</span>
                    <div>
                      <p className="font-semibold text-blue-700">Locate Device ID</p>
                      <p className="text-blue-600 text-sm">Find the 6-character ID on your IoT device</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-start p-4 bg-green-50 rounded-lg">
                    <span className="text-green-500 text-2xl mr-3">2</span>
                    <div>
                      <p className="font-semibold text-green-700">Enter Device Details</p>
                      <p className="text-green-600 text-sm">Provide device ID and a descriptive name</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-start p-4 bg-purple-50 rounded-lg">
                    <span className="text-purple-500 text-2xl mr-3">3</span>
                    <div>
                      <p className="font-semibold text-purple-700">Configure Settings</p>
                      <p className="text-purple-600 text-sm">Set up field parameters and automation rules</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <p className="text-yellow-700 text-sm">
                    💡 <strong>Tip:</strong> Ensure your IoT device is powered on and within WiFi range before connecting.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Field Configuration Tab */}
          {activeTab === "configuration" && (
            <motion.div
              key="configuration"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                  <span className="mr-2">🌾</span>
                  Field Configuration
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Field Size (acres)
                    </label>
                    <input
                      type="number"
                      name="fieldSize"
                      value={formData.fieldSize}
                      onChange={handleInputChange}
                      placeholder="Enter field size in acres"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Crop Type
                    </label>
                    <select
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Crop Type</option>
                      {cropTypes.map(crop => (
                        <option key={crop} value={crop}>{crop}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Soil Type
                    </label>
                    <div className="space-y-2">
                      {soilTypes.map(soil => (
                        <label key={soil.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="soilType"
                            value={soil.value}
                            checked={formData.soilType === soil.value}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-semibold">{soil.label}</p>
                            <p className="text-sm text-gray-600">{soil.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                  <span className="mr-2">💧</span>
                  Irrigation Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Irrigation Duration: {formData.irrigationDuration} minutes
                    </label>
                    <input
                      type="range"
                      name="irrigationDuration"
                      min="5"
                      max="120"
                      step="5"
                      value={formData.irrigationDuration}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>5 min</span>
                      <span>120 min</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Moisture Threshold: {formData.moistureThreshold}%
                    </label>
                    <input
                      type="range"
                      name="moistureThreshold"
                      min="20"
                      max="80"
                      value={formData.moistureThreshold}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>20% (Dry)</span>
                      <span>80% (Wet)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Smart Automation</p>
                      <p className="text-sm text-gray-600">Automatic irrigation based on soil moisture</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="automation"
                        checked={formData.automation}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Push Notifications</p>
                      <p className="text-sm text-gray-600">Get alerts for irrigation events</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Connected Devices Tab */}
          {activeTab === "devices" && (
            <motion.div
              key="devices"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                  <span className="mr-2">📱</span>
                  Connected Devices ({devices.filter(d => d.status === 'connected').length}/{devices.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-xl border-2 ${
                        device.status === 'connected' 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{device.name}</h3>
                          <p className="text-sm text-gray-600">{device.id}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          device.status === 'connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {device.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Battery:</span>
                          <span className="flex items-center">
                            {getBatteryIcon(device.battery)} {device.battery}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Signal:</span>
                          <span>{getSignalIcon(device.signal)} {device.signal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Seen:</span>
                          <span>{device.lastSeen}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600">
                          Configure
                        </button>
                        <button className="flex-1 bg-gray-500 text-white py-1 px-3 rounded text-sm hover:bg-gray-600">
                          {device.status === 'connected' ? 'Disconnect' : 'Remove'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Settings Button */}
        {(activeTab === "connection" || activeTab === "configuration" || activeTab === "automation") && (
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              💾 Save All Settings
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Settings;