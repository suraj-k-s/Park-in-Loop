import "./ParkingFacility.css"
import {CalendarToday, DirectionsCar, LocationSearching, MailOutline, PermIdentity, PhoneAndroid} from '@mui/icons-material';
import ViewService from "./ViewService";
import ParkingFacilityBarGraph from "./ParkingFacilityBarGraph";
import { BookingData } from "../../../../DummyData";

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";


export default function ParkingFacility() {

    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log(id);


    const fetchData = () => {
        axios
        .get(
            `http://localhost:4000/parkingfacility/${id}`
        )
        .then((response) => {
          var data = response.data.data[0];
          setData(data);
          
        });
      }


      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div className="parkingFacility">
        <div className="parkingFacilityTitle">
            <h2 className="viewParkingFacility">View Parking Facility</h2>
        </div>
        <div className="parkingFacilityContainer">
            <div className="parkingFacilityShow">
                <div className="parkingFacilityShowTop">
                    {data.pfacility_name}
                </div>
                <div className="parkingFacilityShowBottom">
                    <span className="parkingFacilityShowTitle">Account Details</span>
                    <div className="parkingFacilityShowInfo">
                        <PermIdentity className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.powner_name}</span>
                    </div>
                    <div className="parkingFacilityShowInfo">
                        <PhoneAndroid className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.powner_contact}</span>
                    </div>
                    <div className="parkingFacilityShowInfo">
                        <MailOutline className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.powner_email}</span>
                    </div>
                    <div className="parkingFacilityShowInfo">
                        <LocationSearching className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.location_name}</span>
                    </div>
                    <div className="parkingFacilityShowInfo">
                        <DirectionsCar className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.pfacility_slots}</span>
                    </div>
                    <div className="parkingFacilityShowInfo">
                        <CalendarToday className="parkingFacilityShowIcon"/>
                        <span className="parkingFacilityShowInfoTitle">{data.powner_doj}</span>
                    </div>
                </div>
            </div>
            <div className="parkingFacilityServiceShow">
            <ViewService id={id}/>
            </div>
        </div>
        {/* <div className="parkingFacilityBarGraphContainer">
            <ParkingFacilityBarGraph data={BookingData} title="Booking Analysis of Last 7 Days" grid dataKey="Bookings"/>
        </div> */}
    </div>
  )
}   
