// components/SensorCard.jsx
import { motion } from "framer-motion";

const SensorCard = ({ title, value, optimal, status, icon }) => {
  const statusColors = {
    optimal: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-green-700 mb-2">{value}</div>
      <div className="text-sm text-gray-600 mb-3">Optimal: {optimal}</div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </motion.div>
  );
};

export default SensorCard;