// components/IrrigationControl.jsx
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const IrrigationControl = ({ status, nextSchedule, duration, zone }) => {
  const { navigate } = useAppContext()
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Irrigation Control</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Current Mode</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">Auto</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Next Schedule</span>
          <span className="font-semibold text-gray-800">Tomorrow 06:00</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Duration</span>
          <span className="font-semibold text-gray-800">45 minutes</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Active Zone</span>
          <span className="font-semibold text-gray-800">North Field</span>
        </div>
        <div className="flex gap-3 pt-4">
          <motion.button
          onClick={() => navigate("/login")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Start Now
          </motion.button>
          <motion.button
          onClick={() => navigate("/settings")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Settings
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IrrigationControl;