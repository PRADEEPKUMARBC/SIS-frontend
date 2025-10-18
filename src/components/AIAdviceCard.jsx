// components/AIAdviceCard.jsx
const AIAdviceCard = ({ advice, confidence, priority }) => {
  const priorityColors = {
    low: "bg-green-100 border-green-300",
    medium: "bg-yellow-100 border-yellow-300",
    high: "bg-red-100 border-red-300"
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${priorityColors[priority]}`}>
      <div className="flex items-start gap-4">
        <div className="text-3xl">🤖</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Recommendation</h3>
          <p className="text-gray-700 mb-3">{advice}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Confidence: {confidence}</span>
            <span className="text-sm font-medium text-green-600">Priority: {priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdviceCard;