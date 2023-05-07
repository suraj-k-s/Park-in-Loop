import "./UserParkingBookingLimit.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserParkingBookingLimit() {
  var pid = sessionStorage.getItem("pfacilityId");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();

  const onSubmit = (e) => {
    var dat = {
      user_id: sessionStorage.getItem("userId"),
      booking_date: textInput1.current.value,
      exit_date: textInput2.current.value,
      booking_vehicelno: textInput3.current.value,
      pid: pid,
    };
    axios
      .post("http://localhost:4000/userbookinglimit", dat)
      .then((response) => {
        var type = response;
        console.log(type);
        if (type.data != "") {
          var dat1 = {
            user_id: sessionStorage.getItem("userId"),
            booking_date: textInput1.current.value,
            exit_date: textInput2.current.value,
            booking_vehicelno: textInput3.current.value,
            pid: pid,
            sid: type.data,
          };
          axios
            .post("http://localhost:4000/userbookinglimitentry", dat1)
            .then((response) => {
              var booking_id = response.data.data[0].id;
              window.sessionStorage.setItem("bookingId", booking_id);
              window.location = "/User/ServiceBooking";
            });
        } 
        else {
          alert("No Slots Available in the given Time");
        }
      });
  };

  // var currentdate = new Date();
  // var datetime =
  //   currentdate.getFullYear() +
  //   "-" +"0"+
  //   currentdate.getMonth() +
  //   "-" +
  //   currentdate.getDate() +
  //   "T" +
  //   currentdate.getHours() +
  //   ":" +
  //   currentdate.getMinutes()
  // console.log(datetime);

  return (
    <div className="userParkingBookingLimit">
      <div className="userParkingBookingLimitContainer">
        <h2 className="userParkingBookingLimitHeader">Book Your Slot</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userParkingBookingLimitFormWrapper">
            <div className="userParkingBookingLimitFormRow">
              <div className="userParkingBookingLimitFormLabel">
                Entry Date & Time :
              </div>
              <div className="userParkingBookingLimitFormBox">
                <input
                  type="datetime-local"
                  placeholder="Enter the Registration Number"
                  className="userParkingBookingLimitFormInput"
                  ref={textInput1}
                  required
                />
              </div>
            </div>
            <div className="userParkingBookingLimitFormRow">
              <div className="userParkingBookingLimitFormLabel">
                Exit Date & Time :
              </div>
              <div className="userParkingBookingLimitFormBox">
                <input
                  type="datetime-local"
                  placeholder="Enter the Registration Number"
                  className="userParkingBookingLimitFormInput"
                  ref={textInput2}
                  required
                />
              </div>
            </div>
            <p className="userParkingBookingLimitFormBoxNote">
              *The slot reservation will be cancelled if you fail to reach
              within 1hr from the Booking time
              <br />
              <br />
              **You must Exit the slot within the given time, else you must need
              to pay a fine
            </p>
            <div className="userParkingBookingLimitFormRow">
              <div className="userParkingBookingLimitFormLabel">
                Vehicle Reg No. :
              </div>
              <div className="userParkingBookingLimitFormBox">
                <input
                  type="text"
                  placeholder="Enter the Registration Number"
                  className="userParkingBookingLimitFormInput"
                  ref={textInput3}
                  required
                />
              </div>
            </div>
            <div className="userParkingBookingLimitFormRowBtnSubmit">
              <input
                type="submit"
                value="Next"
                className="userParkingBookingLimitFormSubmit"
              />
              <Link to="/User" className="link">
                <input
                  type="submit"
                  value="Cancel"
                  className="userParkingBookingLimitFormCancel"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
