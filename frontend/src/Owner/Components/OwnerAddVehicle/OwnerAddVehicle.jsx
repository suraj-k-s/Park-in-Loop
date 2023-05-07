import "./OwnerAddVehicle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
export default function OwnerAddVehicle() {

  
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const id = sessionStorage.getItem("pfacilityId");

  let textInput1 = useRef();

  const fetchData = () => {
    axios.get("http://localhost:4000/checkslot/" + id).then((response) => {
      var data = response.data.data[0];
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e) => {
    var dat = {
      booking_vehicelno: textInput1.current.value,
      id: sessionStorage.getItem("pfacilityId"),
      slot: data.slot_id,
    };
    axios
      .post("http://localhost:4000/owneraddvehicle", dat)
      .then((response) => {
        alert("Vehicle Added Successfully...!");
        window.location = "/Owner/AddVehicleService";
        var booking_id = response.data.data[0].id;
        window.sessionStorage.setItem("bookingId", booking_id);
      });
  };

  return (
    <div className="ownerAddVehicle">
      <div className="ownerAddVehicleContainer">
        <h2 className="ownerAddVehicleHeader">Add Vehicle</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="ownerAddVehicleFormWrapper">
            <div className="ownerAddVehicleFormRow">
              <div className="ownerAddVehicleFormLabel">Vehicle Reg No. :</div>
              <div className="ownerAddVehicleFormBox">
                <input
                  type="text"
                  placeholder="Enter the Registration Number"
                  className="ownerAddVehicleFormInput"
                  // pattern="[A-Z0-9]"
                  ref={textInput1}
                  required
                />
              </div>
            </div>
            <div className="ownerAddVehicleFormRowBtnSubmit">
              <input
                type="submit"
                value="Next"
                className="ownerAddVehicleFormSubmit"
              />

              <Link to="/Owner" className="link">
                <input
                  type="submit"
                  value="Cancel"
                  className="ownerAddVehicleFormCancel"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
