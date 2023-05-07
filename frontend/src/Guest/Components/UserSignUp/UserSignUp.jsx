import "./UserSignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";

export default function UserSignUp() {
  const [data, setData] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();
  let textInput4 = useRef();

  

  const onSubmit = (e) => {
    var dat = {
      user_name: textInput1.current.value,
      user_email: textInput2.current.value,
      user_contact: textInput3.current.value,
      user_password: textInput4.current.value,
    };
    axios.post("http://localhost:4000/userreg/", dat).then((response) => {
      if(response.data.message === "Email Already Exist"){
        alert("Email-ID already Registered...!!")
      }
      else if(response.data.message === "Contact Already Exist"){
        alert("Contact Number already Registered")
      }
      else{
      alert("Registration Successful...!!");
      window.location = "/Login";
      }
    });
  };

  // const checker = () => {
  //   var email = textInput2.current.value;
  //   axios.get(`https://localhost:4000/checker/${email}`, );
    
  // }

  return (
    <div className="userSignUp">
      <div className="userSignUpContainer">
        <h2 className="userSignUpHeader">User Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userSignUpFormWrapper">
            <div className="userSignUpFormRowFlex">
              <div className="userSignUpFormRow">
                <div className="userSignUpFormLabelLeft">Name :</div>
                <div className="userSignUpFormBox">
                  <input
                    type="text"
                    ref={textInput1}
                    placeholder="Enter your Name"
                    className="userSignUpFormInput"
                  required
                  />
                </div>
              </div>
              <div className="userSignUpFormRow">
                <div className="userSignUpFormLabelRight">Email :</div>
                <div className="userSignUpFormBox">
                  <input
                    type="text"
                    ref={textInput2}
                    placeholder="Enter your Email"
                    className="userSignUpFormInput"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="userSignUpFormRowFlex">
              <div className="userSignUpFormRow">
                <div className="userSignUpFormLabelLeft">Contact Number :</div>
                <div className="userSignUpFormBox">
                  <input
                    type="text"
                    value="+91"
                    className="userSignUpFormCountryCode"
                  />
                  <span>
                    <input
                    required
                      type="text"
                      ref={textInput3}
                      placeholder="Enter your Mobile Number"
                      className="userSignUpFormContact"
                    />
                  </span>
                </div>
              </div>
              <div className="userSignUpFormRow">
                <div className="userSignUpFormLabelRight">Password :</div>
                <div className="userSignUpFormBox">
                  <input
                  required
                    type="password"
                    ref={textInput4}
                    placeholder="Enter your Password"
                    className="userSignUpFormInput"
                  />
                </div>
              </div>
            </div>
            <div className="userSignUpFormCheckboxContainer">
              <input
                type="checkbox"
                className="userSignUpFormCheckbox"
                required
              />
              <span className="userSignUpFormCheckboxContent">
                By Checking this Box, You accept to the Terms & Conditions
              </span>
            </div>
            <div className="userSignUpFormRowBtnSubmit">
                <input
                  type="submit"
                  
                  value="Sign Up"
                  className="userSignUpFormSubmit"
                />
              <Link to="/Login" className="link">
                <input
                  type="submit"
                  value="Cancel"
                  className="userSignUpFormCancel"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
