import {
  AccessAlarm,
  CalendarMonth,
  CurrencyRupee,
  LocalParking,
  LockClock,
} from "@mui/icons-material";
import { AiFillCreditCard, AiFillMail, AiFillPhone } from "react-icons/ai";
import {
  FaUserAlt,
  FaCcMastercard,
  FaCcVisa,
  FaCcDiscover,
} from "react-icons/fa";
import { BsFillCalendarDateFill, BsCreditCard2BackFill } from "react-icons/bs";
import { SiBankofamerica } from "react-icons/si";
import { Link } from "react-router-dom";
import "./UserAdvancePayment.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserAdvancePayment() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [rate, setRate] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  var bid = sessionStorage.getItem("bookingId");

  const fetchData = () => {
    axios
      .get("http://localhost:4000/advancepayment/" + bid)
      .then((response) => {
        var data = response.data.data[0];
        setData(data);
        var time = data.entry_time;
        var rate = data.pfacility_rate;
        setRate(rate);
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

  const onSubmit = (e) => {
    var dat = {
      rate: rate,
      bid: bid,
    };

    axios.put("http://localhost:4000/advancepay/", dat).then((response) => {
      alert("Payment Successful...!");
      window.location = "/User/BookingSuccess";
    });
  };

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

  // var dateString = data1; // Oct 23
  // var dateObject = new Date(dateString);
  // const tArray = dateObject.split(" ");
  // console.log(tArray);



  return (
    <div className="userAdvancePayment">
      <div className="userAdvancePaymentContainer">
        <div className="userAdvancePaymentDetailsWrapper">
          <div className="userAdvancePaymentDetailsTitleWrapper">
            <p className="userAdvancePaymentDetailsTitle">Payment Details</p>
          </div>
          <div className="userAdvancePaymentDetailsRow">
            <LocalParking className="userAdvancePaymentDetailsIcon" />
            <p>{data.pfacility_name}</p>
          </div>
          <div className="userAdvancePaymentDetailsRow">
            <CalendarMonth className="userAdvancePaymentDetailsIcon" />
            <p>{data1}</p>
          </div>
          <div className="userAdvancePaymentDetailsRow">
            <AccessAlarm className="userAdvancePaymentDetailsIcon" />
            <p>{time}</p>
          </div>
          <div className="userAdvancePaymentDetailsRow">
            <p>Advance Amount :</p>
            <CurrencyRupee className="userAdvancePaymentDetailsRsIcon" />
            <p className="userAdvancePaymentDetailsRs">{data.pfacility_rate}</p>
          </div>
          <div className="userAdvancePaymentDetailBankWrapper">
            <p>Payment Powered By :</p>
            <div className="userAdvancePaymentDetailBankIconWrapper">
              <FaCcMastercard className="userAdvancePaymentDetailBankIcon" />
              <FaCcVisa className="userAdvancePaymentDetailBankIcon" />
              <FaCcDiscover className="userAdvancePaymentDetailBankIcon" />
              <SiBankofamerica className="userAdvancePaymentDetailBankIcon" />
            </div>
          </div>
        </div>

        <div className="userAdvancePaymentFormContainer">
          <div className="userAdvancePaymentFormTitleWrapper">
            <p className="userAdvancePaymentFormTitle">
              Pay Using Credit/Debit Card
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userAdvancePaymentFormWrapper">
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormLabel">
                  <FaUserAlt className="userAdvancePaymentFormLabelIcon" />
                </div>
                <div className="userAdvancePaymentForm">
                  <input
                    type="text"
                    className="userAdvancePaymentFormInput"
                    placeholder="Card Owner Name"
                    required
                  />
                </div>
              </div>
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormLabel">
                  <AiFillCreditCard className="userAdvancePaymentFormLabelIcon" />
                </div>
                <div className="userAdvancePaymentForm">
                  <input
                    type="text"
                    className="userAdvancePaymentFormInput"
                    placeholder="Enter Valid Card Number"
                    required
                  />
                </div>
              </div>
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormLabel">
                  <BsFillCalendarDateFill className="userAdvancePaymentFormLabelIcon" />
                </div>
                <div className="userAdvancePaymentForm">
                  <select
                    name="month"
                    id=""
                    className="userAdvancePaymentFormMonth"
                    required
                  >
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                  </select>
                  <select
                    name="year"
                    id=""
                    className="userAdvancePaymentFormYear"
                    required
                  >
                    <option value="">2022</option>
                    <option value="">2023</option>
                    <option value="">2024</option>
                    <option value="">2025</option>
                  </select>
                </div>
                <div className="userAdvancePaymentFormLabel">
                  <BsCreditCard2BackFill className="userAdvancePaymentFormLabelIcon" />
                </div>
                <input
                  type="password"
                  className="userAdvancePaymentFormCvv"
                  placeholder="CVV"
                  required
                />
              </div>
              <div className="userAdvancePaymentFormRow"></div>
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormLabel">
                  <AiFillMail className="userAdvancePaymentFormLabelIcon" />
                </div>
                <div className="userAdvancePaymentForm">
                  <input
                    type="email"
                    className="userAdvancePaymentFormInput1"
                    placeholder="Enter Your Email-ID"
                    value={data.user_email}
                    readOnly
                  />
                </div>
              </div>
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormLabel">
                  <AiFillPhone className="userAdvancePaymentFormLabelIcon" />
                </div>
                <div className="userAdvancePaymentForm">
                  <input
                    type="text"
                    className="userAdvancePaymentFormInput1"
                    placeholder="Enter Your Contact Number"
                    value={data.user_contact}
                    readOnly
                  />
                </div>
              </div>
              <div className="userAdvancePaymentFormRow">
                <div className="userAdvancePaymentFormBtnWrapper">
                  <input
                    type="submit"
                    value="Pay Now"
                    className="userAdvancePaymentFormPayBtn"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
