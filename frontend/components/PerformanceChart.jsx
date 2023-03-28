import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

function PerformanceChart({ data, width }) {
  console.log(data)
  return (
    <BarChart
      width={width}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="acertos" fill="#07DB47" />
      <Bar dataKey="erros" fill="#DB2927" />
      <Bar dataKey="restantes" fill="#124375" />
    </BarChart>
  )
}

export default PerformanceChart