import Confetti from "react-confetti";
import "./UserBookingSuccess.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function UserBookingSuccess() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  var bid = sessionStorage.getItem("bookingId");

  const fetchData = () => {
    axios.get("http://localhost:4000/vehicleadded/" + bid).then((response) => {
      var data = response.data.data[0];
      setData(data);
      var time = data.entry_time;
      const myArray = time.split("T");
      var x = myArray[0];
      var y = myArray[1];
      setData1(x);
      setData2(y);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);


  const timeString = data2;
  // Prepend any date. Use your birthday.
  const timeString12hr = new Date(
    "1970-01-01T" + timeString + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  var time = timeString12hr;

  

  return (
    <div className="userBookingSuccess">
      <div className="userBookingSuccessContainer">
        <Confetti
          width={500}
          height={450}
          recycle={false}
          numberOfPieces={140}
          tweenDuration={6000}
          className="userBookingSuccessConfetti"
        />
        <div className="userBookingSuccessTitleWrapper">
          <p className="userBookingSuccessTitle">Booking Successfull...!</p>
        </div>
        <div className="userBookingSuccessContentWrapper">
          <p className="userBookingSuccessContent">
            Slot Number :{" "}
            <span className="userBookingSuccessContentSlot">
              {" "}
              {data.slot_number}
            </span>
          </p>
        </div>
        <div className="userBookingSuccessRow">
          <div className="userBookingSuccessLabel">Date :</div>
          <div className="userBookingSuccessData">{data1}</div>
        </div>
        <div className="userBookingSuccessRow">
          <div className="userBookingSuccessLabel">Time :</div>
          <div className="userBookingSuccessData">{time}</div>
        </div>

        <div className="userBookingSuccessButtonWrapper">
          <Link to="/User" className="link">
            <input
              type="button"
              value="Home"
              className="userBookingSuccessButton"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
