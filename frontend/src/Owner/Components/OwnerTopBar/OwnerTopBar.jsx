import {
  BarChart,
  ManageHistory,
  Notifications,
  Settings,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./OwnerTopBar.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerTopBar() {
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  var id = sessionStorage.getItem("ownerId");

  const fetchData = () => {
    axios
      .get("http://localhost:4000/ownerfacilitycheck/" + id)
      .then((response) => {
        var data = response.data.data[0];
        setData(data);
        setHide(response.data.type);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const logout = () =>{
    sessionStorage.removeItem('userId');
    window.location.replace("/")
  }

  return (
    <div className="ownerTopBar">
      <div className="ownerTopBarWrapper">
        <div className="ownerTopBarLogoContainer">
          <Link to="/Owner/" className="link">
            <h2 className="ownerTopBarlogo">
              park'in<span className="ownerTopBarLogoStyle1">Loop</span>
            </h2>
          </Link>
        </div>
        <div className="ownerTopBarOthersWrapper">
          
          {hide ? (
            <Link to="/Owner/OwnerMySpace" className="link">
              <div className="ownerTopBarOthersItem">
                <ManageHistory />
              </div>
            </Link>
          ) : (
            ""
          )}
          <Link to="/Owner/OwnerAnalysis" className="link">
            <div className="ownerTopBarOthersItem">
              <BarChart />
            </div>
          </Link>
          <div className="ownerTopBarOthersItem">
            <div className="dropdown">
              <Notifications />
              <div className="dropdown-content">
                <Link to="/Owner/OwnerPendingVehicle">Pending Parkings</Link>
                <Link to="/Owner/OwnerComplaint">Complaint</Link>
                <Link to="/Owner/OwnerFeedback">Feedback</Link>
              </div>
            </div>
          </div>
          <div className="ownerTopBarOthersItem">
            <div className="dropdown">
              <Settings />
              <div className="dropdown-content">
                <Link to="/Owner/OwnerChangePwd">Change Password</Link>
                <a onClick={()=>logout()}>Sign Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
