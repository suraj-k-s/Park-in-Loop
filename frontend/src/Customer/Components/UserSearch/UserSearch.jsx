import "./UserSearch.css";
import { Link } from "react-router-dom";
import {
  Close,
  CurrencyRupee,
  DirectionsCar,
  LocationCity,
  LocationOn,
  LocationSearching,
  MiscellaneousServices,
  PushPin,
  Sort,
} from "@mui/icons-material";
import Dropdown from "react-dropdown";
import UserSearchHome from "./UserSearchHome/UserSearchHome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function UserSearchResult() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [type, setType] = useState(false);

  const id = sessionStorage.getItem("locationId");

  const fetchData = () => {
    axios
      .get("http://localhost:4000/usersearchresult/" + id)
      .then((response) => {
        var data = response.data.data;
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const slotChecker = (id) => {
    var pfacilityId = id;
    sessionStorage.setItem("pfacilityId", pfacilityId);
    axios.get("http://localhost:4000/usercheckslot/" + id).then((response) => {
      var status = response.data.data;
      sessionStorage.setItem("slotId", status);
      var t = response.data.type
      if(t === true){
        window.location = "/User/ParkingBooking";
      }
      else{
        alert("Slots Available for Limited Time Only...!! \nPlease Provide the details to Check...!!")
        window.location = "/User/ParkingBookingLimit"
      }
    });
    
  };

  return (
    <div className="userSearchResult">
      <UserSearchHome />
      <div className="userSearchResultView">
        <div className="userSearchResultViewTitleWrapper">
          <h2 className="userSearchResultViewTitle">Result</h2>
          <div>
            <div className="sortdropdown">
              <Sort className="userSearchResultViewTitleIcon" />
              <div className="sortdropdown-content">
                <Link to="">Slot</Link>
                <Link to="">Rate</Link>
              </div>
            </div>
            <Link to="/User" className="link">
              <Close className="userSearchResultViewTitleIcon" />
            </Link>
          </div>
        </div>
        {data.map((result, key) => (
          <div className="userSearchResultViewContentContainer" key={key}>
            <div className="userSearchResultViewContentTitleWrapper">
              <p className="userSearchResultViewContentTitle">
                {result.pfacility_name}
              </p>
              <div className="userSearchResultViewContentRsWrapper">
                <CurrencyRupee className="userSearchResultViewContentIcon" />
                <span className="userSearchResultViewContentRs">
                  {result.pfacility_rate}
                </span>
                <span className="userSearchResultViewContentHr">/hr</span>
              </div>
            </div>
            <div className="userSearchResultViewContentDetailsContainer">
              <div className="userSearchResultViewContentDetailsWrapper">
                <div className="userSearchResultViewContentDetailsRow">
                  <LocationSearching className="userSearchResultViewContentDetailsIcon" />
                  <p className="userSearchResultViewContentDetails">
                    {result.location_name}
                  </p>
                </div>
                <div className="userSearchResultViewContentDetailsRow">
                  <PushPin className="userSearchResultViewContentDetailsIcon" />
                  <p className="userSearchResultViewContentDetails">
                    {result.pfacility_landmark}
                  </p>
                </div>
                <div className="userSearchResultViewContentDetailsRow">
                  <DirectionsCar className="userSearchResultViewContentDetailsIcon" />
                  <p className="userSearchResultViewContentDetails">
                    {result.pfacility_slots}
                  </p>
                </div>
              </div>
              <input
                type="Button"
                value="Book Now"
                className="userSearchResultViewBookBtn"
                onClick={() => slotChecker(result.pfacility_id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
