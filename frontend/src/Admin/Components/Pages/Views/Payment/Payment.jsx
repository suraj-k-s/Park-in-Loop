import "./Payment.css";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { payment } from "../../../../../DummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Payment() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "payment_id", headerName: "ID", width: 70 },
    { field: "user_name", headerName: "User Name", width: 180 },
    { field: "pfacility_name", headerName: "Parking Name", width: 180 },
    { field: "payment_date", headerName: "Date", width: 230 },
    { field: "total_amount", headerName: "Amount", width: 90 },
  ];

  const fetchData = () => {
    axios.get("http://localhost:4000/adminpayment").then((response) => {
      var data = response.data.data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="payment">
      <div className="paymentContainer">
        <div className="paymentTitleWrapper">
          <h2 className="paymentTitle">Payments</h2>
        </div>
        <div className="paymentView">
          <DataGrid
            disableSelectionOnClick
            getRowId={row => row.payment_id}
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
}
