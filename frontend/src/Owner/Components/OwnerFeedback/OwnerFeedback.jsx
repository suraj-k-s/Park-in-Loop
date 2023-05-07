import "./OwnerFeedback.css"
import { DataGrid } from '@mui/x-data-grid'
import { ownerFeedback } from "../../../DummyData"
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"

export default function OwnerFeedback() {
  
  const [data, setData] = useState([]);
    var pfacilityid=sessionStorage.getItem("pfacilityId")


  const columns = [
    { field: 'feedback_id', headerName: 'ID', width: 70 },
    { field: 'user_name', headerName: 'User Name', width: 150, },
    { field: 'feedback_date', headerName: 'Date', width: 120, },
    { field: 'feedback_content', headerName: 'Content', width: 290, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>
    
            <Link to={"/Owner/OwnerFeedbackView/"+params.row.feedback_id}>
            <Visibility className="ownerFeedbackListViewButton"/>
            </Link>
            </>
        )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/ownerfeedback/"+pfacilityid
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
    <div className="ownerFeedback">
        <div className="ownerFeedbackContainer">
            <div className="ownerFeedbackTitleWrapper">
                <h2 className="ownerFeedbackTitle">
                 Feedbacks
                </h2>   
            </div>
            <div className="ownerFeedbackTable">
                <DataGrid
                getRowId={row => row.feedback_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                
            />    
            </div>
        </div>
    </div>
  )
}
