import Confetti from "react-confetti";
import "./OwnerVehicleAdded.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OwnerVehicleAdded() {

  const [data, setData] = useState([]);


  var booking_id = sessionStorage.getItem("bookingId");

  const fetchData = () => {
    axios
      .get("http://localhost:4000/vehicleadded/" + booking_id)
      .then((response) => {
        var data = response.data.data;
        setData(data[0]);
       
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


  setTimeout(() => {
    window.location="/Owner"
  }, 5000);

  return (
    <div className="ownerVehicleAdded">
      <div className="ownerVehicleAddedContainer">
        <Confetti
          width={500}
          height={450}
          recycle={false}
          numberOfPieces={140}
          tweenDuration={6000}
          className="ownerVehicleAddedConfetti"
        />
        <div className="ownerVehicleAddedTitleWrapper">
          <p className="ownerVehicleAddedTitle">
            Vehicle Added Successfully!!
          </p>
        </div>
        <div className="ownerVehicleAddedContentWrapper">
            <p className="ownerVehicleAddedContent">
                Slot Number : <span className="ownerVehicleAddedContentSlot"> {data.slot_number}</span>
            </p>
        </div>
        <div className="ownerVehicleAddedButtonWrapper">
            <Link to="/Owner" className="link">
            <input type="button" value="Home" className="ownerVehicleAddedButton"/>
            </Link>
        </div>
      </div>
    </div>
  );
}
