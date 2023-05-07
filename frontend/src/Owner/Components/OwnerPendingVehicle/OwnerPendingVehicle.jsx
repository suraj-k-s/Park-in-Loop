import "./OwnerPendingVehicle.css"
import { DataGrid } from '@mui/x-data-grid'
import { ownerPendingVehicle } from "../../../DummyData"
import { Done } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"

export default function OwnerPendingVehicle() {
  
  const [data, setData] = useState([]);
    var pfacilityid=sessionStorage.getItem("pfacilityId")


  const columns = [
    { field: 'booking_id', headerName: 'ID', width: 70 },
    { field: 'user_name', headerName: 'User Name', width: 150, },
    { field: 'entry_time', headerName: 'Date & Time', width: 180, },
    { field: 'booking_vehicleno', headerName: 'Vehicle No.', width: 150, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>
    
            <Done className="ownerPendingVehicleListViewButton" onClick={()=>updatePending(params.row.booking_id)}/>
            </>
        )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/pendingvehicle/"+pfacilityid
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);


  const updatePending = (id) => {
    axios.put(`http://localhost:4000/updatepending/${id}`)
    .then((response) => {
        alert("Vehicle Entry Verified Successfully...!!");
        window.location = "/Owner/OwnerPendingVehicle";
      });
  }


  return (
    <div className="ownerPendingVehicle">
        <div className="ownerPendingVehicleContainer">
            <div className="ownerPendingVehicleTitleWrapper">
                <h2 className="ownerPendingVehicleTitle">
                 PendingVehicles
                </h2>   
            </div>
            <div className="ownerPendingVehicleTable">
                <DataGrid
                getRowId={row => row.booking_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  fontSize: 14,
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
