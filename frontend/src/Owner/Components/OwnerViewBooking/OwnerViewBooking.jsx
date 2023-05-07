
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { bookings } from "../../../DummyData"
import "./OwnerViewBooking.css"

import { useState, useEffect } from "react"
import axios from "axios"

export default function OwnerViewBooking() {

  const [data, setData] = useState([]);
    var pfacilityid=sessionStorage.getItem("pfacilityId")

    const columns = [
        { field: 'booking_id', headerName: 'ID', width: 80 },
        { field: 'user_name', headerName: 'Name', width: 160 },
        { field: 'entry_time', headerName: 'Date & Time', width: 160 },
        {field: 'booking_vehicleno',headerName: 'Vehicle No',width: 130},
        {field: 'total_time',headerName: 'Time',width: 150},
        {field: 'slot_number',headerName: 'Slot No.',width: 80},
        {field: 'parking_amount',headerName: 'Amount',width: 80},
    ]

    const fetchData = () => {
      axios
      .get(
        "http://localhost:4000/ownerbooking/"+pfacilityid
      )
      .then((response) => {
        var data = response.data.data;
        setData(data);
        console.log(data);
      });
    }
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="ownerViewBooking">
        <div className="ownerViewBookingContainer">
            <div className="ownerViewBookingTitleWrapper">
                <h2 className="ownerViewBookingTitle">
                    Parking History
                </h2>
            </div>
            <div className="ownerViewBookingTable">
            <DataGrid
            getRowId={row => row.booking_id}
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
  )
}
