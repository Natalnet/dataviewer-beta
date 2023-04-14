import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

function PerformanceChart({ data, width }) {
 
  return (
    
    <BarChart
      width={width}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
       
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />      
      <Bar dataKey="acertos" stackId="a" fill="#07DB47" />      
      <Bar dataKey="restantes" stackId="a" fill="#124375" />
      <Bar dataKey="erros"stackId="a" fill="#DB2927" />
    </BarChart>
     
  )
}

export default PerformanceChart