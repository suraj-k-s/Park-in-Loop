import "./UserMyBookings.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mybookings } from "../../../DummyData";
import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserMyBookings() {
  const [data, setData] = useState([]);
  const [type, setType] = useState(false)

  var userid = sessionStorage.getItem("userId");

  const fetchData = () => {
    axios.get("http://localhost:4000/mybookings/" + userid).then((response) => {
      var data = response.data.data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "booking_id", headerName: "ID", width: 80 },
    { field: "entry_time", headerName: "Date & Time", width: 180 },
    { field: "location_name", headerName: "Location", width: 140 },
    { field: "booking_vehicleno", headerName: "Vehicle No", width: 160 },
    { field: "booking_status", headerName: "Status", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <Visibility
              className="userFeedbackViewButton"
              onClick={()=>userbview(params.row.booking_id)}
            />
          </>
        );
      },
    },
  ];

const userbview = (id) => {
    axios.get("http://localhost:4000/bookingstatuscheck/" + id).then((response) => {
      var data = response.data.data;
      setData(data);
      var type = response.data.type
      setType(type)
      if(type==true){
        console.log(id);
        window.location=`/User/BookingView/${id}`;
      }
      else{
        alert("Your Parking is not Yet Completed...!")
        window.location ="/User/MyBookings"
      }
    });
  };


  return (
    <div className="userMyBookings">
      <div className="userMyBookingsTitleWrapper">
        <h2 className="userMyBookingsTitle">My Bookings</h2>
      </div>
      <div className="userMyBookingsContainer">
        <div className="userMyBookingsView">
          <DataGrid
            getRowId={(row) => row.booking_id}
            rows={data}
            columns={columns}
            rowsPerPageOptions={[4]}
            components={{ Toolbar: GridToolbar }}
            sx={{
              boxShadow: 2,
              border: 2,
              fontSize: 15,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
