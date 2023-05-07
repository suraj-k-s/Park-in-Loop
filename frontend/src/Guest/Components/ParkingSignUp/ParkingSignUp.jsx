import "./ParkingSignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ParkingSignUp() {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();
  let textInput4 = useRef();
  let textInput5 = useRef();
  let textInput6 = useRef();

  const onSubmit = (e) => {
    var dat = {
      powner_name: textInput1.current.value,
      powner_email: textInput2.current.value,
      powner_aadhaar: textInput3.current.value,
      powner_location: textInput4.current.value,
      powner_contact: textInput5.current.value,
      powner_password: textInput6.current.value,
    };
    axios.post("http://localhost:4000/parkownerreg/", dat).then((response) => {
      if (response.data.message === "Already Exist") {
        alert("Email-ID already Registered...!!");
      } else {
        alert("Registration Successful...!!");
        window.location = "/Login";
      }
    });
  };

  return (
    <div className="parkingSignUp">
      <div className="parkingSignUpContainer">
        <h2 className="parkingSignUpHeader">Parking Owner Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="parkingSignUpFormWrapper">
            <div className="parkingSignUpFormRowFlex">
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelLeft">Name :</div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="text"
                    ref={textInput1}
                    placeholder="Enter your Name"
                    className="parkingSignUpFormInput"
                    pattern="[A-Za-z ]{1,}"
                    required
                  />
                </div>
              </div>
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelRight">Email :</div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="text"
                    ref={textInput2}
                    placeholder="Enter your Email"
                    className="parkingSignUpFormInput"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{0,}$"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="parkingSignUpFormRowFlex">
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelLeft">Aadhaar :</div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="text"
                    ref={textInput3}
                    placeholder="Enter Aadhaar Number"
                    className="parkingSignUpFormInput"
                    pattern="[0-9]{12}"
                    required
                  />
                </div>
              </div>
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelRight">Location :</div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="text"
                    placeholder="Enter Location"
                    ref={textInput4}
                    className="parkingSignUpFormInput"
                    pattern="[A-Za-z]{1,}"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="parkingSignUpFormRowFlex">
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelLeft">
                  Contact Number :
                </div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="text"
                    value="+91"
                    className="parkingSignUpFormCountryCode"
                  />
                  <span>
                    <input
                      type="text"
                      ref={textInput5}
                      placeholder="Enter your Mobile Number"
                      className="parkingSignUpFormContact"
                      pattern="[0-9]{10}"
                      required
                    />
                  </span>
                </div>
              </div>
              <div className="parkingSignUpFormRow">
                <div className="parkingSignUpFormLabelRight">Password :</div>
                <div className="parkingSignUpFormBox">
                  <input
                    type="password"
                    ref={textInput6}
                    placeholder="Enter your Password"
                    className="parkingSignUpFormInput"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="parkingSignUpFormCheckboxContainer">
              <input
                type="checkbox"
                className="parkingSignUpFormCheckbox"
                required
              />
              <span className="parkingSignUpFormCheckboxContent">
                By Checking this Box, You accept to the Terms & Conditions
              </span>
            </div>
            <div className="parkingSignUpFormRowBtnSubmit">
              <input
                type="submit"
                value="Sign Up"
                className="parkingSignUpFormSubmit"
              />

              <Link to="/Login" className="link">
                <input
                  type="submit"
                  value="Cancel"
                  className="parkingSignUpFormCancel"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
