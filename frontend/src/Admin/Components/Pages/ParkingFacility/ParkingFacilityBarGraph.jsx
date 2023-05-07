import "./ParkingFacilityBarGraph.css"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ParkingFacilityBarGraph({title, data, dataKey}) {
  return (
    <div className="ParkingFacilityBarGraph">
        <h3 className="ParkingFacilityBarGraphTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={data}>
        <XAxis dataKey="name" stroke="darkcyan"/>
        <YAxis stroke="darkcyan"/>
          <Bar dataKey={dataKey} fill="darkcyan" />
          <Tooltip className="ParkingFacilityBarGraphTooltip"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
    