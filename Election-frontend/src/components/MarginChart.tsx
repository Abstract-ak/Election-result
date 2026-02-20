import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface MarginData {
  year: string;
  margin: number;
}

interface MarginChartProps {
  data: MarginData[];
}

const MarginChart: React.FC<MarginChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Winning Margin (Last 15 Years)</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="margin"
            stroke="#000000"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarginChart;
