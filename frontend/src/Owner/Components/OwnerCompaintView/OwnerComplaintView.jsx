import {
  CalendarToday,
  DirectionsCar,
  HourglassBottom,
  PermIdentity,
} from "@mui/icons-material";
import "./OwnerComplaintView.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function OwnerComplaintView() {

  const [data, setData] = useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput = useRef();

  const { id } = useParams();

  var pfacilityId = sessionStorage.getItem("pfacilityId")

  const fetchData = () => {
    axios.get(`http://localhost:4000/complaint/${id}`).then((response) => {
      var data = response.data.data[0];
      console.log(data);
      setData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = () => {
    var dat = {
      complaint_reply: textInput.current.value,
    }
    
    axios.put(`http://localhost:4000/complaintreply/${id}`, dat).then((response) => {
      alert("Updated Successfully...!!");
      window.location = "/Owner/OwnerComplaint";
    });
  };

  return (
    <div className="ownerComplaintView">
      <div className="ownerComplaintViewContainer">
        <div className="ownerComplaintViewTitleContainer">
          <h2 className="ownerComplaintViewTitle">Complaint Details</h2>
        </div>
        <div className="ownerComplaintViewComplaintContainer">
        
          <div className="ownerComplaintViewComplaintTop">
            <div className="ownerComplaintViewComplaintTopLeft">
              <div className="ownerComplaintViewComplaintInfoTitle">
                <PermIdentity className="ownerComplaintViewComplaintInfoLogo" />
                <div className="ownerComplaintViewComplaintInfo">
                  {data.user_name}
                </div>
              </div>

              <div className="ownerComplaintViewComplaintInfoTitle">
                <CalendarToday className="ownerComplaintViewComplaintInfoLogo" />
                <div className="ownerComplaintViewComplaintInfo">
                  {data.complaint_date}
                </div>
              </div>
            </div>
            <div className="ownerComplaintViewComplaintTopRight">
              <h4 className="ownerComplaintViewComplaintTopRightTitle">
                Reply Details
              </h4>
              <div className="ownerComplaintViewComplaintReplyInfoTitle">
                <CalendarToday className="ownerComplaintViewComplaintReplyLogo" />
                <div className="ownerComplaintViewComplaintReplyInfo">
                  {data.complaint_replydate}
                </div>
              </div>
              <div className="ownerComplaintViewComplaintReplyInfoTitle">
                <HourglassBottom className="ownerComplaintViewComplaintReplyLogo" />
                <div className="ownerComplaintViewComplaintReplyInfo">
                  {data.complaint_status}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ownerComplaintViewComplaintBottom">
            <h4 className="ownerComplaintViewComplaintBottomTitile">
              Complaint
            </h4>
            <div className="ownerComplaintViewComplaintBottomContent">
              {data.complaint_content}
            </div>
            <div className="ownerComplaintReplyContainer">
              <div className="ownerComplaintReplyLabel">Reply :</div>
              <div className="ownerComplaintReplyInputBox">
                <textarea
                  className="ownerComplaintReplyInput"
                  defaultValue={data.complaint_reply}
                  placeholder="Enter The Reply"
                  ref={textInput}
                ></textarea>
              </div>
            </div>
            <div className="ownerComplaintReplyStatusContainer">
              <div className="ownerComplaintReplyStatusBtnWrapper">
                <input
                  type="button"
                  value="Update"
                  className="ownerComplaintReplyStatusBtn"
                  onClick={()=>onSubmit()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
