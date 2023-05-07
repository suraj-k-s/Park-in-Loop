import "./PendingApprovals.css"
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from "react"
import axios from "axios"
import { pendingApprovals } from "../../../../../DummyData";
import { Cancel, CheckCircle } from "@mui/icons-material";


export default function PendingApprovals() {
    const [data, setData] = useState([]);
  
  const columns = [
    { field: 'powner_id', headerName: 'No.', width: 70 },
    { field: 'powner_name', headerName: 'Name of Owner', width: 150, },
    { field: 'powner_doj', headerName: 'Date of Request', width: 120, },
    { field: 'powner_email', headerName: 'Email', width: 180, },
    { field: 'powner_contact', headerName: 'Contact', width: 110, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>
            <CheckCircle className="pendingApprovalsApprove" onClick={()=>pendingUpdate(params.row.powner_id)} />
            <Cancel className="pendingApprovalsDelete" onClick={()=>pendingDelete(params.row.powner_id)} />
          </>
        )
      }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/pendingappr"
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const pendingDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/pendingappr/${id}`
      )
      .then((response) => {
        alert("Request Declined...!!");
        console.log(id);
        fetchData();
      });
  };

  const pendingUpdate = (id) => {
    axios
      .put(
        `http://localhost:4000/pendingappr/${id}`
      )
      .then((response) => {
        alert("Request Approved...!!");
        console.log(id);
        fetchData();
      });
  };


  return (
    <div className="pendingApprovals">
        <div className="pendingApprovalsContainer">
            <div className="pendingApprovalsTitleWrapper">
                <h2 className="pendingApprovalsTitle">
                 Pending Approvals
                </h2>   
            </div>
            <div className="pendingApprovalsView">
                <DataGrid
                getRowId={row => row.powner_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                pageSize={4}
                
            />    
            </div>
        </div>
    </div>
  )
}
