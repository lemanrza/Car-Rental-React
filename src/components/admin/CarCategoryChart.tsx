import CarService from '@/services/requests/CarService';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#facc15', '#f97316', '#a78bfa', '#34d399', '#fbbf24', '#94a3b8'];

const CarCategoryChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchCarsCategory = async () => {
      try {
        const cars = await CarService.getAll();
        const counts: { [type: string]: number } = {};
        cars.forEach((car: any) => {
          const category = car.category || 'Unknown';
          counts[category] = (counts[category] || 0) + 1;
        });

        const formattedData = Object.entries(counts).map(([name, value]) => ({
          name,
          value,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch apartment types:', error);
      }
    };

    fetchCarsCategory();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
      <h2 className="text-lg font-semibold">Car Categories</h2>
      <p className="text-sm text-gray-500 mb-2">Distribution of car categories</p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarCategoryChart;
