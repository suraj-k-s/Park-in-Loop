import "./District.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {DeleteOutline} from '@mui/icons-material'
import { Link } from "react-router-dom";
import axios from "axios";
import React, { Component } from "react";


export default class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: "",
      districtData: [],
      columns: [  
        {
          field: "district_id",
          headerName: "ID",
          width: 130,
        },
        {
          field: "district_name",
          headerName: "District",
          width: 260,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <DeleteOutline
                  className="districtListDelete"
                  onClick={() => this.districtDelete(params.row.district_id)}
                />
              </>
            );
          },
        },
      ],
    };
  }

  componentDidMount() {
  
    axios
      .get(
        "http://localhost:4000/District"
      )
      .then((response) => {
        var data = response.data.data;
        this.setState({ districtData: data });
      });
  }

  districtDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/District/${id}`
      )
      .then((response) => {
        alert("District Deleted Successfully...!!")
        this.componentDidMount();
      });
  };


  render() {    return (
      <div className="district">
        <div className="districtContainer">
            <div className="districtTitleWrapper">
                <h2 className="distictTitle">
                 Districts
                </h2>
                <span className="districtButtonWrapper">
                <Link to="/Admin/addDistrict" className="link">
                <input className="districtButton" type="button" value="Add New"/>
                </Link>
                </span>
            </div>
            <div className="districtView">
                <DataGrid
                getRowId={row => row.district_id}
                disableSelectionOnClick
                rows={this.state.districtData}
                columns={this.state.columns}
                checkboxSelection
                rowsPerPageOptions={[5]}
                components={{ Toolbar: GridToolbar }}
            />    
            </div>
        </div>
    </div>
    )
  }
}
