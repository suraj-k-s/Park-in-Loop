import "./AddServiceType.css"
import { Link } from "react-router-dom"
import axios from "axios";
import { useRef, useState } from "react";

export default function AddServiceType() {
  
  const [type,setType] = useState("");

  let textInput = useRef();

  
  const saveData = (e) => {


    var dat = {
      servicetype_name : textInput.current.value,
    };

    axios.post("http://localhost:4000/servicetype/", dat).then((response) => {
      if(response.data.message === "Already Exist"){
        alert("Service Already Exist...!!")
      }
      else{
      window.location='/Admin/ServiceType';
      alert("Service Registered Successfully...!")
      }
    });
  };

  return (
    <div className="addServiceType">
        <div className="addServiceTypeContainer">
            <h2 className="addServiceTypeTitle">
                ServiceType Registration
            </h2>
            <div className="addServiceTypeRow">
              <div className="addServiceTypeLabel">ServiceType Name</div>
              <div className="addServiceTypeBox">
                <input type="text"   ref={textInput}  name="type" className="addServiceTypeBoxElement"/>
              </div>
            </div>
            <div className="addServiceTypeRow">
              <div className="addServiceTypeLabel"></div>
              <div className="addServiceTypeBox">
                
                <input type="submit" onClick={()=>{saveData()}} value="Register" className="addServiceTypeSubmitButton" />
                <Link to="/ServiceType">
                <input type="submit" value="Cancel" className="addServiceTypeCancelButton" />
                </Link>
              </div>
            </div>
        </div>
    </div>
  )
}
