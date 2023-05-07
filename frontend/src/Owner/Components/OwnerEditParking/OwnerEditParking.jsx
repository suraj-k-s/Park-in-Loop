import "./OwnerEditParking.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function OwnerAddParking() {

  const [data, setData] = useState([]);

  const id=sessionStorage.getItem("pfacilityId")

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();
  let textInput4 = useRef();

  const onSubmit = (e) => {
    var dat = {
      pfacility_name: textInput1.current.value,
      pfacility_slots: textInput2.current.value,
      pfacility_rate: textInput3.current.value,
      pfacility_landmark: textInput4.current.value,
      
    };

    axios
      .put("http://localhost:4000/ownereditfacility/" +id, dat)
      .then((response) => {
        window.location = "/Owner/OwnerMySpace";
        alert("Details Updated Successfully...!")
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/ownereditfacility/"+id).then((response) => {
        var data = response.data.data[0];
        setData(data);
      })
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ownerAddParking">
      <div className="ownerAddParkingContainer">
        <h2 className="ownerAddParkingHeader">Edit Parking Space</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ownerAddParkingFormWrapper">
          <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">Name :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="text"
                  defaultValue={data.pfacility_name}
                  placeholder="Enter Facility Name"
                  className="ownerAddParkingFormInput"
                  ref={textInput1}
                />
              </div>
            </div>
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelRight">District :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  name=""
                  value={data.district_name}
                  readOnly
                  className="ownerAddParkingFormInput"
                  ref={textInput2}
                  />
              </div>
            </div>
            </div>
            <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelRight">Location :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  name=""
                  value={data.location_name}
                  readOnly
                  className="ownerAddParkingFormInput"
                />
              </div>
            </div>
          
          
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">
                Available Slots :
              </div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="number"
                  defaultValue={data.pfacility_slots}
                  placeholder="Enter The Number of Slots"
                  className="ownerAddParkingFormInput"
                  ref={textInput2}
                  readOnly
                />
              </div>
            </div>
            </div>
            <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelRight">Rate :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="text"
                  defaultValue={data.pfacility_rate}
                  placeholder="Enter the Parking Fee per Hour "
                  className="ownerAddParkingFormInput"
                  ref={textInput3}
                />
              </div>
            </div>
          
          <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">Landmark :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="text"
                  defaultValue={data.pfacility_landmark}
                  placeholder="Enter LandMark"
                  className="ownerAddParkingFormInput"
                  ref={textInput4}
                />
              </div>
            </div>
          </div>
          </div>
          <div className="ownerAddParkingFormRowBtnSubmit">
            
              <input
                type="submit"
                value="Update"
                className="ownerAddParkingFormSubmit"
              />
          
            <Link to="/Owner/OwnerMySpace" className="link">
              <input
                type="submit"
                value="Cancel"
                className="ownerAddParkingFormCancel"
              />
            </Link>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
