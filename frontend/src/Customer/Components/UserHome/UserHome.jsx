import { Paid } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import "./UserHome.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserHome() {
  var userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let textInput = useRef();

  const onSubmit = (e) => {
      var dat = {
        location_name: textInput.current.value
      } 

      axios
      .post("http://localhost:4000/usersearching/", dat)
      .then((response) => {
        var data = response.data.data[0];
        setData(data)
        
        var type = response.data.type
        if(type==true){
        var location_id = data.location_id
        window.sessionStorage.setItem('locationId', location_id)
        window.location = "/User/SearchResult";
        }
        else{
          alert("Sorry !!! Our Services are not yet available at this location...!")
        }
      });
      
  };

  return (
    <div className="userHome">
      <div className="userHomeTopContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="userHomeTitleWrapper">
          <h2 className="userHomeTitle">
            HAVING TROUBLE IN FINDING PARKING SPACE ?
          </h2>
        </div>
        <div className="userHomeSearchContainer">
          <input
            type="search"
            placeholder="Where are you Going ?"
            className="userHomeSearchInput"
            
            defaultValue="" 
            ref={textInput}
            required
          />

          <input type="submit" value="Search" className="userHomeSearchBtn" />
        </div>
        </form>
      </div>

      <div className="userHomeBottomContainer">
        <div className="userHomeBottomContent1Wrapper">
          <h2 className="userHomeBottomContent1">
            RESERVE.<div className="userHomeBottomContent1Style">PREPAY.</div>{" "}
            SAVE.
          </h2>
          <p className="userHomeBottomContent1Description">
            Save Upto 50% on Bookings
          </p>
          <Paid className="userHomeBottomContent1Icon" />
        </div>
        <div className="userHomeBottomContent2Wrapper">
          <IoCarSportSharp className="userHomeBottomContent2Icon" />
          <h2 className="userHomeBottomContent2">
            DRIVE.<div className="userHomeBottomContent2Style">ARRIVE.</div>{" "}
            PARK.
          </h2>
          <p className="userHomeBottomContent2Description">No Hidden Charges</p>
        </div>
      </div>
    </div>
  );
}
