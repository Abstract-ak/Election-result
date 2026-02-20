import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendData {
  year: string;
  [party: string]: string | number;
}

interface TrendChartProps {
  title: string;
  data: TrendData[];
  partyColors?: Record<string, string>;
}

const defaultColors: string[] = [
  "#22c55e", // green
  "#f97316", // orange
  "#ef4444", // red
  "#3b82f6", // blue
  "#a855f7", // purple
];

const TrendChart: React.FC<TrendChartProps> = ({
  title,
  data,
  partyColors = {},
}) => {
  if (!data || data.length === 0) return null;

  const partyKeys = Object.keys(data[0]).filter((key) => key !== "year");

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis />

          <Tooltip />

          <Legend />

          {partyKeys.map((party, index) => (
            <Line
              key={party}
              type="monotone"
              dataKey={party}
              stroke={
                partyColors[party] ||
                defaultColors[index % defaultColors.length]
              }
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
