import type { Rental } from "@/types/rentalType";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  labels: string[];
  rentals: Rental[];
}

const RevenueChart: React.FC<Props> = ({ labels, rentals }) => {
  const chartData = labels.map((month, index) => {
    const revenue = rentals.reduce((sum, rental) => {
      const rentalDate = new Date(rental.startDate);
      if (
        rentalDate.getMonth() === new Date(new Date().getFullYear(), new Date().getMonth() - 6 + index).getMonth() &&
        rentalDate.getFullYear() === new Date().getFullYear()
      ) {
        return sum + rental.totalPrice;
      }
      return sum;
    }, 0);
    return { month, revenue };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
      <h2 className="text-lg font-semibold">Revenue Overview</h2>
      <p className="text-sm text-gray-500 mb-2">Monthly revenue for the current year</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#818cf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
