import { Visibility } from "@mui/icons-material";
import "./WidgetSmall.css";
import Img from "../../../Assets/user-picture.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function WidgetSmall() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/adminnewusers")
      .then((response) => {
        var data = response.data.data;
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function ChangeFormateDate(oldDate)
{
    const myArray = oldDate.split("-");
    var x =myArray[2]+"-"+myArray[1];
    return x;

   
}   

  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Joined Users</span>
      <table className="widgetSmallTable">
        <tr>
          <th className="widgetSmallTableHead">Name</th>
          <th className="widgetSmallTableHead">DOJ</th>
          <th className="widgetSmallTableHead">View</th>
        </tr>
      {data.map((result, key) => (
        <tr className="widgetSmallTr">
          <td className="widgetSmallTd">
           {result.user_name}
          </td>
          <td className="widgetSmallTd2">{ChangeFormateDate(result.user_doj)}</td>
          <td className="widgetSmallTd3">
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
          </button>
          </td>
        </tr>
        ))}
      </table>
    </div>
  );
}
