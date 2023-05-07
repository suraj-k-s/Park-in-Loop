import "./OwnerComplaint.css"
import { DataGrid } from '@mui/x-data-grid'
import { ownercomplaint } from "../../../DummyData";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"


export default function OwnerComplaint() {
    const [data, setData] = useState([]);
    var pfacilityid=sessionStorage.getItem("pfacilityId")
  
  const columns = [
    { field: 'complaint_id', headerName: 'ID', width: 70 },
    { field: 'user_name', headerName: 'User Name', width: 180, },,
    { field: 'complaint_date', headerName: 'Date', width: 130, },
    { field: 'complaint_status', headerName: 'Status', width: 110, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>

            <Link to={"/Owner/OwnerComplaintView/"+params.row.complaint_id}>
            <Visibility className="ownerComplaintListViewButton"/>
            </Link>
            </>
        )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/ownercomplaint/"+pfacilityid
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
    <div className="ownerComplaint">
        <div className="ownerComplaintContainer">
            <div className="ownerComplaintTitleWrapper">
                <h2 className="ownerComplaintTitle">
                 Complaints
                </h2>   
            </div>
            <div className="ownerComplaintTable">
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
