import "./OwnerAnalysis.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { useState, useEffect } from "react"
import axios from "axios"

import { OwnerLine } from "../../../DummyData";

export default function OwnerAnalysis() {


  const [data, setData] = useState([]);

  const [data2, setData2] = useState([]);

  var pfacilityid=sessionStorage.getItem("pfacilityId")


  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/ownerbookingpiedirect/"+pfacilityid
    )
    .then((response) => {
      var data = response.data.data[0];
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData2 = () => {
    axios
    .get(
      "http://localhost:4000/ownerbookingpieuser/"+pfacilityid
    )
    .then((response) => {
      var data2 = response.data.data[0];;
      setData2(data2);
    });
  }
  useEffect(() => {
    fetchData2();
  }, []);

  var online = data2.userno;
  var direct = data.directno;

  const OwnerPie = [
    { name: 'Online Booking', value: online, fill:'darkcyan' },
    { name: 'Direct Parking', value: direct, fill:'rgb(92, 174, 247)'},
  ];

  return (
    <div className="ownerAnalysis">
      <div className="ownerAnalysisContainer">
        <div className="ownerAnalysisTitleWrapper">
          <h2 className="ownerAnalysisTitle">Analysis</h2>
        </div>
        <div className="ownerAnalysisChartWrapper">
          <div className="ownerAnalysisLineChart">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={OwnerLine}>
                <CartesianGrid strokeDasharray="5 2" stroke="#e0dfdf" />
                <XAxis dataKey="date" stroke="darkcyan" />
                <Line type="monotone" dataKey="bookings" stroke="darkcyan" />
                <Tooltip />
                
              </LineChart>
            </ResponsiveContainer>
            <p className="ownerAnalysisLineChartDescription">
              Parkings in Last 7 days
            </p>
          </div>
          <div className="ownerAnalysisPie">
            <PieChart width={300} height={250}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={OwnerPie}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                label
              />
              <Tooltip />
            </PieChart>
            <div className="ownerAnalysisPieDescriptionWrapper">
              <p className="ownerAnalysisPieDescription">
                Comparison Of Parking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
