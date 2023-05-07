import "./UserSearchHome.css"
import { Link } from "react-router-dom"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserSearchHome() {

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
    <div className='userSearchHome'>
        <div className="userSearchHome">
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
              ref={textInput}
              defaultValue=""
            required
            />
              <input
                type="submit"
                value="Search"
                className="userHomeSearchBtn"
              />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
