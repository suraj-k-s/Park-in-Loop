import { CurrencyRupee } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./OwnerRemoveVehicle.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerRemoveVehicle() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  var id = sessionStorage.getItem("bookingId");
  var w, x, y, z, park, pend;

  const fetchData = () => {
    axios
      .get("http://localhost:4000/removeactiveslots/" + id)
      .then((response) => {
        var data = response.data.data[0];
        setData(data);
        console.log(data);
        w = data.parking_amount;
        y = data.service_amount;
        z = data.advance_amount;
        if(w > 0){
        park = parseInt(w) - parseInt(z);
        setData2(park);
        }
        else{
          park = 0;
          setData2(park);
        }
        pend = parseInt(park) + parseInt(y);
        setData3(pend);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const payment = () => {

    var dat = {
        total: parseInt(data.parking_amount)+parseInt(data.service_amount),
        id: id
    }
    console.log(dat);
      axios.post("http://localhost:4000/ownervehiclepay/",dat)
      .then((response) => {
          window.location ="/Owner"

      })
  }

  return (
    <div className="ownerRemoveVehicle">
      <div className="ownerRemoveVehicleContainer">
        <div className="ownerRemoveVehicleTitleWrapper">
          <h2 className="ownerRemoveVehicleTitle">Free Up Slot</h2>
        </div>
        <div className="ownerRemoveVehicleContentWrapper">
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">Slot No :</div>
            <div className="ownerRemoveVehicleContent">{data.slot_number}</div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">Vehicle No :</div>
            <div className="ownerRemoveVehicleContent">
              {data.booking_vehicleno}
            </div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">
              Entry Date & Time :
            </div>
            <div className="ownerRemoveVehicleContent">{data.entry_time}</div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">Total Time :</div>
            <div className="ownerRemoveVehicleContent">{data.total_time}</div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">
              Parking Amount :
            </div>
            <div className="ownerRemoveVehicleContent">
              <CurrencyRupee className="ownerRemoveVehicleContentIcon" />
              {data2}
            </div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabel">
              Service Amount :
            </div>
            <div className="ownerRemoveVehicleContent">
              <CurrencyRupee className="ownerRemoveVehicleContentIcon" />
              {data.service_amount}
            </div>
          </div>
          <div className="ownerRemoveVehicleContentRow">
            <div className="ownerRemoveVehicleContentLabelLg">
              Pending Amount :
            </div>
            <div className="ownerRemoveVehicleContentLg">
              <CurrencyRupee className="ownerRemoveVehicleContentIcon" />
              {data3}
            </div>
          </div>
          <div className="ownerRemoveVehicleContentBtnContainer">
            <div className="ownerRemoveVehicleContentBtnWrapper">
              <input
                type="button"
                value="Exit"
                className="ownerRemoveVehicleContentBtnSubmit"
                onClick={()=>payment()}
              />
            </div>
            <div className="ownerRemoveVehicleContentBtnWrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
