import "./Location.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {DeleteOutline} from '@mui/icons-material'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Location() {
    const [data, setData] = useState([]);
    
  const columns = [
    { field: 'location_id', headerName: 'ID', width: 70 },
    { field: 'location_name', headerName: 'Location Name', width: 200, },
    { field: 'district_name', headerName: 'District Name', width: 150, },
    { field: 'location_pincode', headerName: 'Pincode', width: 100, },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
      return(
        <>

          <DeleteOutline className="locationDelete" onClick={()=>locationDelete(params.row.location_id)}/>
        </>
      )
    }},
  ];

  const fetchData = () =>{
    axios
    .get(
      "http://localhost:4000/location"
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  },[]);
  const locationDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/location/${id}`
      )
      .then((response) => {
        alert("Location Deleted Successfully...!!")
        fetchData();
      });
  };

  return (
    <div className="location">
        <div className="locationContainer">
            <div className="locationTitleWrapper">
                <h2 className="locationTitle">
                 Locations
                </h2>
                <span className="locationButtonWrapper">
                <Link to="/Admin/addLocation" className="link">
                <input className="locationButton" type="button" value="Add New"/>
                </Link>
                </span>
            </div>
            <div className="locationView">
                <DataGrid
                getRowId={row => row.location_id}
                disableSelectionOnClick
                rows={data}
                columns={columns}
                pageSize={4}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
            />    
            </div>
        </div>
    </div>
  )
}
