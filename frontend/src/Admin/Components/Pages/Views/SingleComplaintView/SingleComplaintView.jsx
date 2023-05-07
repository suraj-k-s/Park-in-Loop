import {
  CalendarToday,
  DirectionsCar,
  HourglassBottom,
  PermIdentity,
} from "@mui/icons-material";
import "./SingleComplaintView.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleComplaintView() {
  const [data, setData] = useState([]);

  const { id } = useParams();
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

  return (
    <div className="singleComplaintView">
      <div className="singleComplaintViewContainer">
        <div className="singleComplaintViewTitleContainer">
          <h2 className="singleComplaintViewTitle">Complaint Details</h2>
        </div>
        <div className="singleComplaintViewComplaintContainer">
          <div className="singleComplaintViewComplaintTop">
            <div className="singleComplaintViewComplaintTopLeft">
              <div className="singleComplaintViewComplaintInfoTitle">
                <PermIdentity className="singleComplaintViewComplaintInfoLogo" />
                <div className="singleComplaintViewComplaintInfo">
                  {data.user_name}
                </div>
              </div>
              <div className="singleComplaintViewComplaintInfoTitle">
                <DirectionsCar className="singleComplaintViewComplaintInfoLogo" />
                <div className="singleComplaintViewComplaintInfo">
                  {data.pfacility_name}
                </div>
              </div>
              <div className="singleComplaintViewComplaintInfoTitle">
                <CalendarToday className="singleComplaintViewComplaintInfoLogo" />
                <div className="singleComplaintViewComplaintInfo">
                  {data.complaint_date}
                </div>
              </div>
            </div>
            <div className="singleComplaintViewComplaintTopRight">
              <h4 className="singleComplaintViewComplaintTopRightTitle">
                Reply Details
              </h4>
              <div className="singleComplaintViewComplaintReplyInfoTitle">
                <CalendarToday className="singleComplaintViewComplaintReplyLogo" />
                <div className="singleComplaintViewComplaintReplyInfo">
                  {data.complaint_replydate}
                </div>
              </div>
              <div className="singleComplaintViewComplaintReplyInfoTitle">
                <HourglassBottom className="singleComplaintViewComplaintReplyLogo" />
                <div className="singleComplaintViewComplaintReplyInfo">
                  {data.complaint_status}
                </div>
              </div>
            </div>
          </div>
          <div className="singleComplaintViewComplaintBottom">
            <h4 className="singleComplaintViewComplaintBottomTitile">
              Complaint
            </h4>
            <div className="singleComplaintViewComplaintBottomContent">
              {data.complaint_content}
            </div>
            <h4 className="singleComplaintViewComplaintBottomTitile">
              Complaint Reply
            </h4>
            <div className="singleComplaintViewComplaintBottomContent">
              {data.complaint_reply}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
