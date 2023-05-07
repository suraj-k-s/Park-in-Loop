import {
  CurrencyRupee,
  LocationOn,
  PermIdentity,
  ConfirmationNumber,
  PushPin
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./OwnerMySpace.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerMySpace() {

    const [data, setData] = useState([]);

    const id=sessionStorage.getItem("pfacilityId")

    console.log(id);

    const fetchData = () => {
      axios
        .get("http://localhost:4000/ownereditfacility/"+id).then((response) => {
          var data = response.data.data[0];
          setData(data);
        })
    };
    useEffect(() => {
      fetchData();
    }, []);

    

  return (
      
    <div className="ownerMySpace">
      <div className="ownerMySpaceTitleWrapper">
        <h2 className="ownerMySpaceTitle">My Parking Space</h2>
      </div>
      <div className="ownerMySpaceContent">
        <div className="ownerMySpaceInfoContainer">
          <h3 className="ownerMySpaceInfoHeader">
            Details
          </h3>
          <div className="ownerMySpaceInfoRow">
            <div className="ownerMySpaceInfoIcon">
              <PermIdentity className="ownerMySpaceInfoIconStyle"/>
            </div>
            <div className="ownerMySpaceInfoData">
            {data.pfacility_name}
            </div>
          </div>
          <div className="ownerMySpaceInfoRow">
            <div className="ownerMySpaceInfoIcon">
              <LocationOn className="ownerMySpaceInfoIconStyle"/>
            </div>
            <div className="ownerMySpaceInfoData">
            {data.location_name}
            </div>
          </div>
          <div className="ownerMySpaceInfoRow">
            <div className="ownerMySpaceInfoIcon">
              <ConfirmationNumber className="ownerMySpaceInfoIconStyle"/>
            </div>
            <div className="ownerMySpaceInfoData">
            {data.pfacility_slots}
            </div>
          </div>
          <div className="ownerMySpaceInfoRow">
            <div className="ownerMySpaceInfoIcon">
              <CurrencyRupee className="ownerMySpaceInfoIconStyle"/>
            </div>
            <div className="ownerMySpaceInfoData">
            {data.pfacility_rate}
            </div>
          </div>
          <div className="ownerMySpaceInfoRow">
            <div className="ownerMySpaceInfoIcon">
              <PushPin className="ownerMySpaceInfoIconStyle"/>
            </div>
            <div className="ownerMySpaceInfoData">
            {data.pfacility_landmark}
            </div>
          </div>
        </div>
        <div className="ownerMySpaceButtonContainer">
        <h3 className="ownerMySpaceInfoHeader">
            Manage
          </h3>
          <div className="ownerMySpaceButton">
            <Link to="/Owner/EditParkingSpace" className="Link">
            <button className="ownerMySpaceButtonStyle">Edit My Space</button>
            </Link>
          </div>
          <div className="ownerMySpaceButton">
          <Link to="/Owner/EditService" className="Link">
            <button className="ownerMySpaceButtonStyle">Services</button>
            </Link>
          </div>
          <div className="ownerMySpaceButton">
          <Link to="/Owner/ViewActiveSlots" className="Link">
            <button className="ownerMySpaceButtonStyle">Manage Slots</button>
            </Link>
          </div>
          <div className="ownerMySpaceButton">
          <Link to="/Owner/ViewBookings" className="Link">
            <button className="ownerMySpaceButtonStyle">View Parkings</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
