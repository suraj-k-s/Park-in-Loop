import "./OwnerAddParking.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function OwnerAddParking() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();
  let textInput4 = useRef();
  let textInput5 = useRef();
  let textInput6 = useRef();

  const onSubmit = (e) => {
    var dat = {
      pfacility_name: textInput1.current.value,
      district_id: textInput2.current.value,
      location_id: textInput3.current.value,
      pfacility_slots: textInput4.current.value,
      pfacility_rate: textInput5.current.value,
      pfacility_landmark: textInput6.current.value,
      powner_id: sessionStorage.getItem('ownerId')
      
    };

    axios
      .post("http://localhost:4000/owneraddfacility/", dat)
      .then((response) => {
        
        var id=response.data.data
        window.sessionStorage.setItem('pfacilityId', id);
        window.location = "/Owner/AddService";
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/district").then((response) => {
        var data = response.data.data;
        setData(data);
      })
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData2 = (id) => {
    axios
      .get("http://localhost:4000/location/" +id).then((response) =>  {
        var data2 = response.data.data;
        
      setData2(data2);
    })
};

  return (
    <div className="ownerAddParking">
      <div className="ownerAddParkingContainer">
        <h2 className="ownerAddParkingHeader">Add Parking Space</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ownerAddParkingFormWrapper">
          <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">Name :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="ownerAddParkingFormInput"
                  ref={textInput1}
                  required
                />
              </div>
            </div>
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelRight">District :</div>
              <div className="ownerAddParkingFormBox">
                <select
                  name=""
                  className="ownerAddParkingFormInput"
                  ref={textInput2}
                  required
                  onChange={(event) => fetchData2(event.target.value)}
                >
                  <option value="">---Select--</option>
                  {data.map((result, key) => (
                    <option key={key} value={result.district_id}>
                      {result.district_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>
            <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelRight">Location :</div>
              <div className="ownerAddParkingFormBox">
                <select
                  name=""
                  className="ownerAddParkingFormInput"
                  ref={textInput3}
                  required
                >
                  <option value="">---Select--</option>
                  {data2.map((result, key) => (
                    <option key={key} value={result.location_id}>
                      {result.location_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          
          
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">
                Available Slots :
              </div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="number"
                  placeholder="Enter The Number of Slots"
                  className="ownerAddParkingFormInput"
                  ref={textInput4}
                  required
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
                  placeholder="Enter the Parking Fee per Hour "
                  className="ownerAddParkingFormInput"
                  ref={textInput5}
                  required
                />
              </div>
            </div>
          
          <div className="ownerAddParkingFormRowFlex">
            <div className="ownerAddParkingFormRow">
              <div className="ownerAddParkingFormLabelLeft">Landmark :</div>
              <div className="ownerAddParkingFormBox">
                <input
                  type="text"
                  placeholder="Enter LandMark"
                  className="ownerAddParkingFormInput"
                  ref={textInput6}
                  required
                />
              </div>
            </div>
          </div>
          </div>
          <div className="ownerAddParkingFormRowBtnSubmit">
            
              <input
                type="submit"
                value="Next"
                className="ownerAddParkingFormSubmit"
              />
          
            <Link to="/Owner" className="link">
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
