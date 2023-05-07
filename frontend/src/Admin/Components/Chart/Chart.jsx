import "./Chart.css"
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Chart({title, data, dataKey, grid}) {
    
      
  return (
    <div className="chart">
        <h3 className="classTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="darkcyan"/>
                <Line type="monotone" dataKey={dataKey} stroke="darkcyan"/>
                <Tooltip/>
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 2"/>}
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
