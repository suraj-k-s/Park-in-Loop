import "./UserServiceBooking.css";
import { Link } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserServiceBooking() {
  const [status, setStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  

    const [data, setData] = useState([]);

    const [service, setService] = useState([]);
    
    var booking_id = sessionStorage.getItem("bookingId");
    var pfacility_id = sessionStorage.getItem('pfacilityId');

    const fetchData = () => {
      axios
        .get("http://localhost:4000/servicecheck/" + pfacility_id)
        .then((response) => {
          var data = response.data.data;
          setData(data);
        });
    };
    useEffect(() => {
      fetchData();
    }, []);


    const serviceFun = (e) => {
      let newArray = [...service, e];
      if (service.includes(e)) {
        newArray = newArray.filter((dat) => dat !== e);
      }
      //console.log(newArray);
      setService(newArray);
    };
    const onSubmit = (e) => {
      var dat = {
        booking_id: booking_id,
        service: service,
        pfacility_id: pfacility_id,
      };
  
      axios
        .post(
          "http://localhost:4000/owneraddvehicleservice/",
          dat
        )
        .then((response) => {
          alert("Service Added Successfully...!");
          window.location = "/User/Payment";
        });
    };
  


    const radioHandler = (status) => {
      setStatus(status)
    }

  return (
    <div className="userServiceBooking">
      <div className="userServiceBookingContainer">
        <h2 className="userServiceBookingHeader">Book Service</h2>
        <div className="userServiceBookingFormWrapper">
          <div className="userServiceBookingFormOption">
            <p className="userServiceBookingFormOptionContent">
              Do You Wish to Add a Service ?
            </p>
            <input
              type="radio"
              name="addVehicleServiceOption"
              value="yes"
              className="userServiceBookingFormOptionRadio"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            />
            Yes
            <input
              type="radio"
              name="addVehicleServiceOption"
              value="no"
              className="userServiceBookingFormOptionRadio"
              checked={status === 2}
              onClick={(e) => radioHandler(2)}
            />
            No
          </div>
          {status === 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="ownerAddServiceFormWrapper">
              <div className="userServiceBookingFormRow">
              {data.map((result, key) => (
                <div className="userServiceBookingSelectWrapper">
                  <label for="wash">
                    <input
                      type="checkbox"
                      onChange={() => serviceFun(result.pservice_id)}
                      name="wash"
                      value="Wash"
                      className="userServiceBookingSelect"
                    ></input>
                    {result.servicetype_name}
                  </label>
                  <div className="userServiceBookingSelectRupee">
                    <p>
                      (
                      <CurrencyRupee className="userServiceBookingSelectRupeeIcon" />
                      {result.pservice_rate})
                    </p>
                  </div>
                </div>
                ))}
                </div>
                
                
                <p className="userServiceBookingNote">
                    *Payment of Service shall be done directly at the Parking Space
                </p>
              <div className="userServiceBookingFormRowBtnSubmit">
                  <input
                    type="submit"
                    value="Confirm"
                    className="userServiceBookingFormSubmit"
                  />
              </div>
            </div>
            </form>
          )}
          {status === 2 && (
            <div className="ownerAddServiceFormWrapper">
              <div className="userServiceBookingFormRowBtnSubmit">
                
                <Link to="/User/Payment" className="link">
                  <input
                    type="submit"
                    value="Confirm"
                    className="userServiceBookingFormSubmit"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
