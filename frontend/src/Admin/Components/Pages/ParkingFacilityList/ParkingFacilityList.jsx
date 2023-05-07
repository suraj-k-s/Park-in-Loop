import "./ParkingFacilityList.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { DeleteOutline, Visibility} from '@mui/icons-material'
import {parkingFacilityRows} from "../../../../DummyData"
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"



export default function ParkingFacilityList() {
  const [data, setData] = useState([]);

  const columns = [
    { field: 'pfacility_id', headerName: 'ID', width: 70 },
    { field: 'pfacility_name', headerName: 'Parking Facility', width: 150 },
    { field: 'powner_email', headerName: 'Email', width: 200 },
    { field: 'powner_contact', headerName: 'Contact No.', width: 130 },
    { field: 'location_name', headerName: 'Location', width: 130 },
    { field: 'pfacility_slots', headerName: 'Slots', width: 80 },
    { field: "action", headerName:"Action", width: 100, renderCell: (params) => {
      return(
        <>
  
          <Link to={"/Admin/parkingfacility/"+params.row.pfacility_id}>
          <Visibility className="parkingFacilityListViewButton"/>
          </Link>
          <DeleteOutline className="parkingFacilityListDelete" onClick={()=>pfacilityDelete(params.row.pfacility_id)}/>
        </>
      )
    }},
  ];

  const fetchData = () => {
    axios
    .get(
      "http://localhost:4000/parkingfacilitylist"
    )
    .then((response) => {
      var data = response.data.data;
      setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const pfacilityDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/parkingfacilitylist/${id}`
      )
      .then((response) => {
        alert("Parking Facility Removed Successfully...!!");
        fetchData();
      });
  };
  
  
  
  return (
    <div className="parkingFacilityList">
      <div className="parkingFacilityListContainer">
        <div className="parkingFacilityListTitleWrapper">
          <h2 className="parkingFacilityListTitle">
            Parking Facility List
          </h2>   
        </div>
        <div className="parkingFacilityListView">
        <DataGrid
        disableSelectionOnClick
        getRowId={row => row.pfacility_id}
        rows={data}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        />
        </div>
      </div>
    </div>
  )
}
