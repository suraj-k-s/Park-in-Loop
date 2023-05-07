import "./OwnerViewActiveSlots.css";
import { DataGrid } from "@mui/x-data-grid";
import { RemoveCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerViewActiveSlots() {
  const [data, setData] = useState([]);

  const id = sessionStorage.getItem("pfacilityId");
  console.log(id);

  const columns = [
    { field: "slot_id", headerName: "ID", width: 80 },
    { field: "booking_id", headerName: "Booking ID", width: 80 },
    { field: "slot_number", headerName: "Slot No.", width: 90 },
    { field: "booking_vehicleno", headerName: "Vehicle Number", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
              <RemoveCircleOutline className="ownerViewSlotDelete"  onClick={()=>slotUpdate(params.row.booking_id, params.row.slot_id)} />
          </>
        );
      },
    },
  ];

  const fetchData = () => {
    axios
      .get("http://localhost:4000/viewactiveslots/" + id)
      .then((response) => {
        var data = response.data.data;
        setData(data);
       
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const slotUpdate = (id1,id2) => {
    sessionStorage.setItem('bookingId',id1)
    var dat = {
      booking_id: id1,
      slot_id: id2
    }
   axios
   .put(`http://localhost:4000/slotupdate/`, dat)
   .then((response) => {
    window.location="/Owner/RemoveVehicle/"+id;
   })
  };
  return (
    <div className="ownerViewActiveSlots">
      <div className="ownerViewActiveSlotsContainer">
        <div className="ownerViewActiveSlotsTitleWrapper">
          <h2 className="ownerViewActiveSlotsTitle">Active Slots</h2>
        </div>
        <div className="ownerViewActiveSlotsTableWrapper">
          <DataGrid
            getRowId={(row) => row.slot_id}
            rows={data}
            columns={columns}
            rowsPerPageOptions={[4]}
          />
        </div>
      </div>
    </div>
  );
}
