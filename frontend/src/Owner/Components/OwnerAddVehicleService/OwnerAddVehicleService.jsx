import "./OwnerAddVehicleService.css";
import { Link } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function OwnerAddVehicleService() {
  const [status, setStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const [data, setData] = useState([]);

  const [service, setService] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  var booking_id = sessionStorage.getItem("bookingId");
  var pfacility_id = sessionStorage.getItem("pfacilityId");

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
        window.location = "/Owner/OwnerVehicleAdded";
      });
  };

  //console.log(service);
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

  const radioHandler = (status) => {
    setStatus(status);
  };
 // console.log(data);
  return (
    <div className="ownerAddVehicleService">
      <div className="ownerAddVehicleServiceContainer">
        <h2 className="ownerAddVehicleServiceHeader">Add Service</h2>
        <div className="ownerAddVehicleServiceFormWrapper">
          <div className="ownerAddVehicleServiceFormOption">
            <p className="ownerAddVehicleServiceFormOptionContent">
              Do You Wish to Add a Service ?
            </p>
            <input
              type="radio"
              name="addVehicleServiceOption"
              value="yes"
              className="ownerAddVehicleServiceFormOptionRadio"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            />
            Yes
            <input
              type="radio"
              name="addVehicleServiceOption"
              value="no"
              className="ownerAddVehicleServiceFormOptionRadio"
              checked={status === 2}
              onClick={(e) => radioHandler(2)}
            />
            No
          </div>
          {status === 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ownerAddServiceFormWrapper">
                <div className="ownerAddVehicleServiceFormRow">
                  {data.map((result, key) => (
                    <div
                      key={key}
                      className="ownerAddVehicleServieSelectWrapper"
                    >
                      <label for="service">
                        <input
                          onChange={() => serviceFun(result.pservice_id)}
                          type="checkbox"
                          name="service"
                          className="ownerAddVehicleServieSelect"
                        ></input>
                        {result.servicetype_name}
                      </label>
                      <div className="ownerAddVehicleServieSelectRupee">
                        <p>
                          (
                          <CurrencyRupee className="ownerAddVehicleServieSelectRupeeIcon" />
                          {result.pservice_rate})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ownerAddVehicleServiceFormRowBtnSubmit">
                  <input
                    type="submit"
                    value="Confirm"
                    className="ownerAddVehicleServiceFormSubmit"
                  />
                </div>
              </div>
            </form>
          )}
          {status === 2 && (
            <div className="ownerAddServiceFormWrapper">
              <div className="ownerAddVehicleServiceFormRowBtnSubmit">
                <Link to="/Owner/OwnerVehicleAdded" className="link">
                  <input
                    type="submit"
                    value="Confirm"
                    className="ownerAddVehicleServiceFormSubmit"
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
