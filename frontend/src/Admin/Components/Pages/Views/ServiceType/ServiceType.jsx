import "./ServiceType.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ServiceType() {
  const [data, setData] = useState([]);
    
  const columns = [
    { field: 'servicetype_id', headerName: 'ID', width: 70 },
    { field: 'servicetype_name', headerName: 'Service Type', width: 250, },
    { field: "action", headerName:"Action", width: 150, renderCell: (params) => {
      return(
        <>

          <DeleteOutline className="servicetypeListDelete" onClick={()=>servicetypeDelete(params.row.servicetype_id)}/>
        </>
      )
    }},
  ];
  const fetchData = () =>{
    axios
    .get(
      "http://localhost:4000/servicetype"
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  },[]);
  const servicetypeDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/servicetype/${id}`
      )
      .then((response) => {
        alert("Service Type Deleted...!!")
        fetchData();
      });
  };
  return (
    <div className="serviceType">
        <div className="serviceTypeContainer">
            <div className="serviceTypeTitleWrapper">
                <h2 className="serviceTypeTitle">
                 Service Types
                </h2>
                <span className="serviceTypeButtonWrapper">
                <Link to="/Admin/addServiceType" className="link">
                <input className="serviceTypeButton" type="button" value="Add New"/>
                </Link>
                </span>
            </div>
            <div className="serviceTypeView">
                <DataGrid
                getRowId={row => row.servicetype_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
            />    
            </div>
        </div>
    </div>
  )
}
