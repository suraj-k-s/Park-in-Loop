import "./Feedback.css"
import { DataGrid } from '@mui/x-data-grid'
import { feedback } from "../../../../../DummyData";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react"
import axios from "axios"

export default function Feedback() {
    const [data, setData] = useState([]);
  
  const columns = [
    { field: 'feedback_id', headerName: 'ID', width: 70 },
    { field: 'user_name', headerName: 'User Name', width: 150, },
    { field: 'pfacility_name', headerName: 'Parking Name', width: 150, },
    { field: 'feedback_date', headerName: 'Date', width: 120, },
    { field: 'feedback_content', headerName: 'Content', width: 190, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
        return(
          <>
    
            <Link to={"/Admin/SingleFeedbackView/"+params.row.feedback_id}>
            <Visibility className="feedbackListViewButton"/>
            </Link>
            </>
        )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/feedback"
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
    <div className="feedback">
        <div className="feedbackContainer">
            <div className="feedbackTitleWrapper">
                <h2 className="feedbackTitle">
                 Feedbacks
                </h2>   
            </div>
            <div className="feedbackView">
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
