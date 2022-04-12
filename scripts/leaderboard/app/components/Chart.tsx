import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    id: string;
    data: { createdAt: number; score: number }[];
  }[];
};

export const Chart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300}>
        <CartesianGrid />
        <XAxis
          dataKey="createdAt"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(unixTime) =>
            new Date(unixTime).toLocaleString().slice(0, -3)
          }
          type="number"
        />
        <YAxis dataKey="score" />
        <Tooltip
          labelStyle={{ color: "gray" }}
          labelFormatter={(unixTime) =>
            new Date(unixTime).toLocaleString().slice(0, -3)
          }
        />
        <Legend />
        {data.map(({ id, name, data }) => (
          <Line
            type="monotone"
            stroke={strToColor(id)}
            dataKey={"score"}
            data={data}
            name={name}
            key={id}
            connectNulls
            strokeWidth={3}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const strToColor = (str: string) => {
  const n = Array.from(str)
    .map((ch) => ch.charCodeAt(0))
    .reduce((a, b) => a + b);
  const colorAngle = (n * n) % 360;
  return `hsl(${colorAngle}, 80%, 64%)`;
};
