import "./UserBookingView.css";
import { FaParking } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { BsFillCalendarDateFill, BsFillAlarmFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineReload, AiFillCar } from "react-icons/ai";
import { HiCurrencyRupee } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function UserBookingView() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState("");
  const [type, setType] = useState(false);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/bookingstatuscheck/${id}`)
      .then((response) => {
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

  const fetchData2 = () => {
    axios
      .get(`http://localhost:4000/usercomplaintreplyview/${id}`)
      .then((response) => {
        var data = response.data.data[0];
        var cm = response.data.data[0].complaint_content;
        setData3(data);
        if (cm.length > 0) {
          var x = true;
        } else {
          var x = false;
        }
        var y = x;
        setType(y);
      });
  };

  useEffect(() => {
    fetchData2();
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

  let textInput1 = useRef();
  let textInput2 = useRef();

  const onSubmit = (e) => {
    var dat = {
      feedback: textInput1.current.value,
      pid: data.pfacility_id,
      uid: sessionStorage.getItem("userId"),
    };
    axios
      .post("http://localhost:4000/usergivefeedback", dat)
      .then((response) => {
        alert("Feedback Given Successfully...!");
        window.location = "/User";
      });
  };

  const onSubmit2 = (e) => {
    var dat = {
      complaint: textInput2.current.value,
      pid: data.pfacility_id,
      bid: data.booking_id,
      uid: sessionStorage.getItem("userId"),
    };
    axios
      .post("http://localhost:4000/usergivecomplaint", dat)
      .then((response) => {
        alert("Please wait for the response...!");
        window.location = "/User";
      });
  };

  console.log(type);

  return (
    <div className="userBookingView">
      <div className="userBookingViewTitleWrapper">
        <h2 className="userBookingViewTitle">Parking Details</h2>
      </div>
      <div className="userBookingViewContainer">
        <div className="userBookingViewDetailsWrapper">
          <div className="userBookingViewDetailsRow">
            <FaParking className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data.pfacility_name}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <ImLocation2 className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data.location_name}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <BsFillCalendarDateFill className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data1}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <BsFillAlarmFill className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{time}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <AiOutlineReload className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">Completed</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <AiFillCar className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data.booking_vehicleno}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <BiTimeFive className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data.total_time}</p>
          </div>
          <div className="userBookingViewDetailsRow">
            <HiCurrencyRupee className="userBookingViewDetailsIcon" />
            <p className="userBookingViewDetail">{data.total_amount}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="userBookingFeedbackform"
        >
          <div className="userBookingFeedbackContainer">
            <p>Your Feedbacks Values a Lot...!</p>
            <textarea
              name=""
              placeholder="Write Your Feedback...!"
              className="userBookingFeedback"
              ref={textInput1}
              required
            ></textarea>
            <input
              type="submit"
              value="Submit"
              className="userBookingFeedbackBtnSubmit"
            />
          </div>
        </form>
        <form
          onSubmit={handleSubmit(onSubmit2)}
          className="userBookingComplaintform"
        >
          <div className="userBookingComplaintContainer">
            {/* <p>Facing Any Problem... Report Now...!</p> */}
            {type ? (
              <>
                <textarea
                  name=""
                  placeholder="Write Your Complaint...!"
                  className="userBookingComplaint"
                  readOnly
                  ref={textInput2}
                  value={data3.complaint_content}
                ></textarea>
                <input
                  type="submit"
                  value="Submit"
                  
                  disabled
                  className="userBookingComplaintBtnSubmitElse"
                />
              </>
            ) : (
              <>
                <textarea
                  name=""
                  placeholder="Write Your Complaint...!"
                  className="userBookingComplaint"
                  required
                  ref={textInput2}
                ></textarea>
                <input
                  type="submit"
                  value="Submit"
                  className="userBookingComplaintBtnSubmit"
                />
              </>
            )}

            <div className="userBookingComplaintViewContainer">
              <h4>Complaint Reply :</h4>
              <p className="userBookingComplaintViewReply">
                {data3.complaint_reply}...!!!
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
