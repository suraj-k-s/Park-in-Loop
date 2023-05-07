import { CalendarToday, DirectionsCar, PermIdentity } from "@mui/icons-material"
import "./SingleFeedbackView.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";


export default function SingleFeedbackView() {

    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log(id);


    const fetchData = () => {
        axios
        .get(
            `http://localhost:4000/feedback/${id}`
        )
        .then((response) => {
          var data = response.data.data[0];
          console.log(data);
          setData(data);
          
        });
      }


      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div className="singleFeedbackView">
        <div className="singleFeedbackViewContainer">
            <div className="singleFeedbackViewTitleContainer">
                <h2 className="singleFeedbackViewTitle">Feedback Details</h2>
            </div>
            <div className="singleFeedbackViewFeedbackContainer">
                <div className="singleFeedbackViewFeedbackTop">
                    <div className="singleFeedbackViewFeedbackInfoTitle">
                        <PermIdentity className="singleFeedbackViewFeedbackInfoLogo"/>
                        <div className="singleFeedbackViewFeedbackInfo">{data.user_name}</div>
                    </div>
                    <div className="singleFeedbackViewFeedbackInfoTitle">
                        <DirectionsCar className="singleFeedbackViewFeedbackInfoLogo"/>
                        <div className="singleFeedbackViewFeedbackInfo">{data.pfacility_name}</div>
                    </div>
                    <div className="singleFeedbackViewFeedbackInfoTitle">
                        <CalendarToday className="singleFeedbackViewFeedbackInfoLogo"/>
                        <div className="singleFeedbackViewFeedbackInfo">{data.feedback_date}</div>
                    </div>
                </div>
                <div className="singleFeedbackViewFeedbackBottom">
                    <h4 className="singleFeedbackViewFeedbackBottomTitile">
                        Feedback
                    </h4>
                    <div className="singleFeedbackViewFeedbackBottomContent">
                    {data.feedback_content}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
