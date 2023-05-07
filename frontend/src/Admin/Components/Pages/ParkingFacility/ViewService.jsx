import * as React from 'react';
import "./ViewService.css"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewService({id}) {

  const [data, setData] = useState([]);



  const columns = [
    { field: 'pservice_id', headerName: 'ID', width: 70 },
    { field: 'servicetype_name', headerName: 'Service Name', width: 150 },
    { field: 'pservice_rate', headerName: 'Service Rate', width: 150 },
    { field: 'pservice_description', headerName: 'Description', width: 150 },
  ];
  

  const fetchData = () => {
      axios
      .get(
          `http://localhost:4000/parkingfacilityservice/${id}`
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
    <div className='viewService'>
      <DataGrid
        getRowId={row => row.pservice_id}
        rows={data}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[]}
      />
    </div>
  );
}