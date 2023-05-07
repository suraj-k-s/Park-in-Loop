import "./AddLocation.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddLocation() {

  const [data, setData] = useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();

  const onSubmit = (e) => {
    var dat = {
      district_id: textInput1.current.value,
      location_name: textInput2.current.value,
      location_pincode: textInput3.current.value,
    };

    axios.post("http://localhost:4000/location/", dat).then((response) => {
      if(response.data.message === "Name Already Exist"){
        alert("Location Already Exist")
      }
      else if(response.data.message === "Pincode Already Exist"){
        alert("Pincode Already Registered")
      }
      else{
      window.location = "/Admin/Location";
      alert("Location Registered Successfully...!!")
      }
    });
  };

  const fetchData = () =>{
    axios
    .get(
      "http://localhost:4000/district"
    )
    .then((response) => response.data.data)
    .then((data) => {
        setData(data);
    });
  }
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="addLocation">
      <div className="addLocationContainer">
        <h2 className="addLocationTitle">Location Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addLocationRow">
          <div className="addLocationLabel">District Name</div>
          <div className="addLocationBox">
            <select
              name="addLocationDistrict"
              ref={textInput1}
              className="addLocationBoxSelectElement"
              required
            >
            <option value="">-----Select District------</option>
              {data.map((result,key) => (
                <option key={key} value={result.district_id}>
                  {result.district_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="addLocationRow">
          <div className="addLocationLabel">Location Name</div>
          <div className="addLocationBox">
            <input type="text" 
            ref={textInput2}
            className="addLocationBoxElement"
            required
            />
          </div>
        </div>
        <div className="addLocationRow">
          <div className="addLocationLabel">Pincode</div>
          <div className="addLocationBox">
            <input type="text" 
            ref={textInput3}
            className="addLocationBoxElement" 
            required
            />
          </div>
        </div>
        <div className="addLocationRow">
          <div className="addLocationLabel"></div>
          <div className="addLocationBox">
            
              <input
                type="submit"
                value="Register"
                className="addLocationSubmitButton"
              />
              <Link to="/Admin/Location">
              <input
                type="submit"
                value="Cancel"
                className="addLocationCancelButton"
              />
            </Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
