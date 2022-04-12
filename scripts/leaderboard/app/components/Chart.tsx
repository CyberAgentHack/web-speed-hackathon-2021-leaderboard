import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCallback, useState } from "react";
import { strToColor } from "~/libs/str-to-color";

type Props = {
  data: {
    name: string;
    id: string;
    data: { createdAt: number; score: number }[];
  }[];
};

export const Chart = ({ data }: Props) => {
  const [hovering, serHovering] = useState<string | null>(null);
  const mouseEnter = useCallback((e: { value: string }) => {
    serHovering(e.value);
  }, []);
  const mouseLeave = useCallback(() => {
    serHovering(null);
  }, []);

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
        <Legend onMouseOver={mouseEnter} onMouseOut={mouseLeave} />
        {data.map(({ id, name, data }) => (
          <Line
            type="monotone"
            stroke={strToColor(id)}
            dataKey={"score"}
            data={data}
            name={name}
            key={id}
            strokeWidth={3}
            connectNulls
            animationDuration={1000}
            label={{
              fill: strToColor(id),
              position: "bottom",
              opacity: hovering !== name ? 0 : 1,
            }}
            {...(hovering !== null && hovering !== name && { opacity: 0.1 })}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
