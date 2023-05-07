import './WidgetLarge.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Pending } from '@mui/icons-material';


export default function WidgetLarge() {


  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/adminnewbooking")
      .then((response) => {
        var data = response.data.data;
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

const statuschecker = (data) => {
  console.log(data);
  if(data == 0){
    var x = "Pending";
    return x
  }
  else if(data == 1){
    var x = "Approved";
    return x
  }
  else{
    var x = "Complete";
    return x
  }
} 

  const Button = ({type})=>{
    return <button className={"widgetLargeButton " + type}>{type}</button>
  }
  return (
    <div className='widgetLarge'>
      <h3 className="widgetLargeTitle">Latest Booking</h3>
      <table className="widgetLargeTable">
        <tr className="widgetLargeTr">
          <th className="widgetLargeTh">User</th>
          <th className="widgetLargeTh">Parking Facility</th>
          <th className="widgetLargeTh">Booking Date</th>
          <th className="widgetLargeTh">Vehicle Number</th>
          <th className="widgetLargeTh">Status</th>
        </tr>
        {data.map((result, key) => (
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <span className="widgetLargeName">{result.user_name}</span>
          </td>
          <td className="widgetLargePfacility">
          {result.pfacility_name}
          </td>
          <td className="widgetLargeDate">
          {result.entry_time}
          </td>
          <td className="widgetLargeVehicleno">
          {result.booking_vehicleno}
          </td>
          <td className="widgetLargeStatus">
           <Button type={statuschecker(result.booking_status)}></Button>
          </td>
        </tr>
        ))}
      </table>
    </div>
  );
}
