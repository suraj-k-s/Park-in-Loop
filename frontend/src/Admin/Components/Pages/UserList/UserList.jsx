import "./UserList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { fontSize } from "@mui/system";

export default function UserList() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "user_id", headerName: "ID", width: 60 },
    {
      field: "user_name",
      headerName: "Parking Facility",
      width: 190,
    },
    { field: "user_email", headerName: "Email", width: 250 },
    { field: "user_contact", headerName: "Contact No.", width: 150 },
    { field: "user_doj", headerName: "DOJ", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="parkingFacilityListDelete"
              onClick={() => userDelete(params.row.user_id)}
            />
          </>
        );
      },
    },
  ];

  const fetchData = () => {
    axios.get("http://localhost:4000/userlist").then((response) => {
      var data = response.data.data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const userDelete = (id) => {
    axios.delete(`http://localhost:4000/userlist/${id}`).then((response) => {
      alert("User Removed Successfully...!!");
      fetchData();
    });
  };

  return (
    <div className="userList">
      <div className="userListContainer">
        <div className="userListTitleWrapper">
          <h2 className="userListTitle">User List</h2>
        </div>
        <div className="userListView">
          <DataGrid
            getRowId={(row) => row.user_id}
            columns={columns}
            rows={data}
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
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
  );
}
