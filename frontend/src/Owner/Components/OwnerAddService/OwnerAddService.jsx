import "./OwnerAddService.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function OwnerAddService() {
  const [status, setStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };

  const [data, setData] = useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();

  const onSubmit = (e) => {
    var dat = {
      servicetype_id: textInput1.current.value,
      pfacility_id: sessionStorage.getItem("pfacilityId"),
      pservice_rate: textInput2.current.value,
      pservice_description: textInput3.current.value,
    };

    axios
      .post("http://localhost:4000/owneraddservice/", dat)
      .then((response) => {
        alert("Registered Successfully...!");
        window.location = "/Owner/AddService";
      });
  };

  const fetchData = () => {
    axios.get("http://localhost:4000/servicetype").then((response) => {
      var data = response.data.data;
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="ownerAddService">
      <div className="ownerAddServiceContainer">
        <h2 className="ownerAddServiceHeader">Add Service</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ownerAddServiceFormWrapper">
          <div className="ownerAddServiceFormOption">
            <p className="ownerAddServiceFormOptionContent">
              Do You Wish to Add a Service ?
            </p>
            <input
              type="radio"
              name="addServiceOption"
              value="yes"
              readOnly
              className="ownerAddServiceFormOptionRadio"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            />
            Yes
            <input
              type="radio"
              name="addServiceOption"
              value="no"
              readOnly
              className="ownerAddServiceFormOptionRadio"
              checked={status === 2}
              onClick={(e) => radioHandler(2)}
            />
            No
          </div>
          {status === 1 && (
            
              <div className="ownerAddServiceFormWrapper">
                
                <div className="ownerAddServiceFormRow">
                  <div className="ownerAddServiceFormLabel">Service :</div>
                  <div className="ownerAddServiceFormBox">
                    <select
                      name=""
                      className="ownerAddParkingFormInput"
                      ref={textInput1}
                    >
                      <option value="">---Select--</option>
                      {data.map((result, key) => (
                        <option key={key} value={result.servicetype_id}>
                          {result.servicetype_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="ownerAddServiceFormRow">
                  <div className="ownerAddServiceFormLabel">Rate :</div>
                  <div className="ownerAddServiceFormBox">
                    <input
                      type="text"
                      placeholder="Enter the Rate of Service"
                      className="ownerAddServiceFormInput"
                      ref={textInput2}
                    />
                  </div>
                </div>
                <div className="ownerAddServiceFormRow">
                  <div className="ownerAddServiceFormLabel">Description :</div>
                  <div className="ownerAddServiceFormBox">
                    <textarea
                      placeholder="Enter the Description"
                      className="ownerAddServiceFormInput"
                      ref={textInput3}
                    />
                  </div>
                </div>
                <div className="ownerAddServiceFormRowBtnSubmit">
                  
                    <input
                      type="submit"
                      value="Add"
                      className="ownerAddServiceFormSubmit"
                    />
                  
                  <Link to="/">
                    <input
                      type="submit"
                      value="Finish"
                      className="ownerAddServiceFormFinish"
                    />
                  </Link>
                </div>
                
              </div>
            
          )}
          {status === 2 && (
            <div className="ownerAddServiceFormWrapper">
              <div className="ownerAddServiceFormRowBtnSubmit">
                <Link to="/Owner">
                  <input
                    type="submit"
                    value="Finish"
                    className="ownerAddServiceFormFinish"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
        </form>
      </div>
    </div>
  );
}
