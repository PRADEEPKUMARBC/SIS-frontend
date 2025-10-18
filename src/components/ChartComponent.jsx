import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", moisture: 65 },
  { day: "Tue", moisture: 58 },
  { day: "Wed", moisture: 72 },
  { day: "Thu", moisture: 60 },
  { day: "Fri", moisture: 66 },
];

function ChartComponent() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-green-700 font-semibold mb-4">Soil Moisture Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="moisture" stroke="#3BB273" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
