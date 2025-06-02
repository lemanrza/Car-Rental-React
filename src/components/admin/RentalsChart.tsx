import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface Props {
  labels: string[];
  data: number[];
}

const RentalsChart: React.FC<Props> = ({ labels, data }) => {
  const chartData = labels.map((month, index) => ({
    month,
    rentals: data[index],
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
      <h2 className="text-lg font-semibold">Rentals Overview</h2>
      <p className="text-sm text-gray-500 mb-2">Monthly rentals for the current year</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="rentals" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentalsChart;
