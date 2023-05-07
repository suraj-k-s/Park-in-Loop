import { CalendarToday, DirectionsCar, PermIdentity } from "@mui/icons-material"
import "./OwnerFeedbackView.css"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OwnerFeedbackView() {

    const [data, setData] = useState([]);

    const { id } = useParams();

    const fetchData = () => {
        axios.get(`http://localhost:4000/feedback/${id}`).then((response) => {
          var data = response.data.data[0];
          setData(data);
        });
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div className="ownerFeedbackView">
        <div className="ownerFeedbackViewContainer">
            <div className="ownerFeedbackViewTitleContainer">
                <h2 className="ownerFeedbackViewTitle">Feedback Details</h2>
            </div>
            <div className="ownerFeedbackViewFeedbackContainer">
                <div className="ownerFeedbackViewFeedbackTop">
                    <div className="ownerFeedbackViewFeedbackInfoTitle">
                        <PermIdentity className="ownerFeedbackViewFeedbackInfoLogo"/>
                        <div className="ownerFeedbackViewFeedbackInfo">{data.user_name}</div>
                    </div>

                    <div className="ownerFeedbackViewFeedbackInfoTitle">
                        <CalendarToday className="ownerFeedbackViewFeedbackInfoLogo"/>
                        <div className="ownerFeedbackViewFeedbackInfo">{data.feedback_date}</div>
                    </div>
                </div>
                <div className="ownerFeedbackViewFeedbackBottom">
                    <h4 className="ownerFeedbackViewFeedbackBottomTitile">
                        Feedback
                    </h4>
                    <div className="ownerFeedbackViewFeedbackBottomContent">
                    {data.feedback_content}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
