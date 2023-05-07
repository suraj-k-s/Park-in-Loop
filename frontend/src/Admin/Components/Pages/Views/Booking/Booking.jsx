import "./Booking.css";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { booking } from "../../../../../DummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Booking() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "booking_id", headerName: "ID", width: 70 },
    { field: "user_name", headerName: "User Name", width: 180 },
    { field: "pfacility_name", headerName: "Parking Name", width: 180 },
    { field: "entry_time", headerName: "Date", width: 230 },
    { field: "total_amount", headerName: "Amount", width: 90 },
  ];

  const fetchData = () => {
    axios.get("http://localhost:4000/adminbookingview").then((response) => {
      var data = response.data.data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    
    <div className="booking">
      <div className="bookingContainer">
        <div className="bookingTitleWrapper">
          <h2 className="bookingTitle">Parking History</h2>
        </div>
        <div className="bookingView">
          <DataGrid
            disableSelectionOnClick
            getRowId={row => row.booking_id}
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
}
