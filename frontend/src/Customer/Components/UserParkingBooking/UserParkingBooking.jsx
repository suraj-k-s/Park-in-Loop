import "./UserParkingBooking.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";


export default function UserParkingBooking() {

var pid = sessionStorage.getItem('pfacilityId')
var slotid = sessionStorage.getItem('slotId')
// console.log(pid);
// console.log(slotid);

var status = sessionStorage.getItem('status');
console.log(status);

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm();

let textInput1 = useRef();
let textInput2 = useRef();

const onSubmit = (e) => {
  var dat = {
    user_id: sessionStorage.getItem('userId'),
    booking_date: textInput1.current.value,
    booking_vehicelno: textInput2.current.value,
    pid: pid ,
    slotid: slotid,
  };
  axios
    .post("http://localhost:4000/userbooking", dat)
    .then((response) => {
      alert("Vehicle Added Successfully...!");
      var booking_id = response.data.data[0].id;
      window.sessionStorage.setItem("bookingId", booking_id);
      window.location = "/User/ServiceBooking";
    });
};



  return (
    <div className="userParkingBooking">
      <div className="userParkingBookingContainer">
        <h2 className="userParkingBookingHeader">Book Your Slot</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="userParkingBookingFormWrapper">
          <div className="userParkingBookingFormRow">
            <div className="userParkingBookingFormLabel">Date & Time :</div>
            <div className="userParkingBookingFormBox">
              <input
                type="datetime-local"
                placeholder="Enter the Registration Number"
                className="userParkingBookingFormInput"
                ref={textInput1}
                required
              />
            </div>
          </div>
          <p className="userParkingBookingFormBoxNote">
            *The slot reservation will be cancelled if you fail to reach within 1hr from the Booking time
          </p>
          <div className="userParkingBookingFormRow">
            <div className="userParkingBookingFormLabel">Vehicle Reg No. :</div>
            <div className="userParkingBookingFormBox">
              <input
                type="text"
                placeholder="Enter the Registration Number"
                className="userParkingBookingFormInput"
                ref={textInput2}
                required
              />
            </div>
          </div>
          <div className="userParkingBookingFormRowBtnSubmit">
              <input
                type="submit"
                value="Next"
                className="userParkingBookingFormSubmit"
              />
            <Link to="/User" className="link">
              <input
                type="submit"
                value="Cancel"
                className="userParkingBookingFormCancel"
              />
            </Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
