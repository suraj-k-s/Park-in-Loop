import "./Complaint.css"
import { DataGrid } from '@mui/x-data-grid'
import { complaint } from "../../../../../DummyData";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"


export default function Complaint() {
    const [data, setData] = useState([]);

  const columns = [
    { field: 'complaint_id', headerName: 'ID', width: 70 },
    { field: 'user_name', headerName: 'User Name', width: 160, },
    { field: 'pfacility_name', headerName: 'Parking Name', width: 180, },
    { field: 'complaint_date', headerName: 'Date', width: 130, },
    { field: 'complaint_status', headerName: 'Status', width: 110, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>
    
            <Link to={"/Admin/SingleComplaintView/"+params.row.complaint_id}>
            <Visibility className="complaintListViewButton"/>
            </Link>
            </>
        )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/complaint"
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="complaint">
        <div className="complaintContainer">
            <div className="complaintTitleWrapper">
                <h2 className="complaintTitle">
                 Complaints
                </h2>   
            </div>
            <div className="complaintView">
                <DataGrid
                getRowId={row => row.complaint_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                
            />    
            </div>
        </div>
    </div>
  )
}
