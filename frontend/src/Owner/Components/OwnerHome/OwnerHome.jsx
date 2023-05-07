import {
  Assessment,
  DirectionsCar,
  LocalParking,
  WindowOutlined,
} from "@mui/icons-material";
import "./OwnerHome.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerHome() {
  var x = sessionStorage.getItem("ownerId");
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);

  const [data1, setData1] = useState([]);
  const [hide1, setHide1] = useState(false);

  var id = sessionStorage.getItem("ownerId");

  const fetchData = () => {
    axios
      .get("http://localhost:4000/ownerfacilitycheck/" + id)
      .then((response) => {
        var data = response.data.data[0];
        setData(data);
        var id = data.pfacility_id;
        setHide(response.data.type);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const facility_id = sessionStorage.getItem("pfacilityId");

  const fetchData1 = () => {
    axios
      .get("http://localhost:4000/checkslot/" + facility_id)
      .then((response) => {
        var data1 = response.data.data[0];
        setData1(data1);
        setHide1(response.data.type);
      });
  };
  useEffect(() => {
    fetchData1();
  }, []);

  const slotchecker = () => {
    
    {hide1 ? (window.location="/Owner/AddVehicle")
    : (
      alert("No Slots Available")
      )}
  };

  return (
    <div className="ownerHome">
      <div className="ownerHomeContainer">
        {hide ? (
          <>
            <div className="ownerHomeBannerWrapper">
              <div className="ownerHomeBannerTitleWrapper">
                <h2 className="ownerHomeBannerTitle">
                  You Have Added Parking Space...!
                </h2>
              </div>
              <div className="ownerHomeBannerContentWraper">
                <p className="ownerHomeBannerContent"></p>
              </div>
              <div className="ownerHomeBannerButtonWrapper">
                <input
                  type="button"
                  value="Add Vehicle"
                  className="ownerHomeBannerButton"
                  onClick={()=>slotchecker()}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ownerHomeBannerWrapper">
              <div className="ownerHomeBannerTitleWrapper">
                <h2 className="ownerHomeBannerTitle">Let The World Know You</h2>
              </div>
              <div className="ownerHomeBannerContentWraper">
                <p className="ownerHomeBannerContent">
                  Havn't Added Your Parking Space Yet ?
                </p>
              </div>
              <div className="ownerHomeBannerButtonWrapper">
                <Link to="AddParkingSpace" className="link">
                  <input
                    type="button"
                    value="Add Now"
                    className="ownerHomeBannerButton"
                  />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="ownerHomeBottomContainer">
        <div className="ownerHomeBottomWrapper1">
          <div className="ownerHomeBottomWrapper1Text">
            <p className="ownerHomeBottomWrapper1Title">
              Manage Your Parking Spaces
            </p>
            <p className="ownerHomeBottomWrapper1Content">
              Browse through your parking facilities. Add features and Update
              them
            </p>

            <div className="ownerHomeBottomButtonWrapper">
              <Link to="/Owner/OwnerMySpace" className="link">
                <input
                  type="button"
                  value="View"
                  className="ownerHomeBottomButton"
                />
              </Link>
            </div>
          </div>
          <div className="ownerHomeBottomWrapper1Image">
            <DirectionsCar className="ownerHomeBottomImg" />
          </div>
        </div>
        <div className="ownerHomeBottomWrapper2">
          <div className="ownerHomeBottomWrapper2Image">
            <Assessment className="ownerHomeBottomImg" />
          </div>
          <div className="ownerHomeBottomWrapper2Text">
            <p className="ownerHomeBottomWrapper2Title">View Parking History</p>
            <p className="ownerHomeBottomWrapper2Content">
              View the Latest Bookings and Details
            </p>
            <div className="ownerHomeBottomButtonWrapper">
              <Link to="/Owner/ViewBookings" className="link">
                <input
                  type="button"
                  value="View"
                  className="ownerHomeBottomButton"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
