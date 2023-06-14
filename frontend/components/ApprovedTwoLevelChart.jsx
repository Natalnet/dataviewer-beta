import { 
    PieChart,
    Pie,
    Tooltip
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}) => {

  const radius = outerRadius * 0.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ApprovedTwoLevelChart({data1, data2}) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data1}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={70}
        fill="#8884d8"
        label = {renderCustomizedLabel}
        labelLine = {false}
      />
      <Pie
        data={data2}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={80}
        outerRadius={105}
        fill="#ffaa7d"

      />
      <Tooltip />
    </PieChart>
  );
}
