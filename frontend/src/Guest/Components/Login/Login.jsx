import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
export default function Login() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    var dat = {
      email: textInput1.current.value,
      password: textInput2.current.value,
    };

    axios.post("http://localhost:4000/login/", dat).then((response) => {
      if (response.data.type === "user") {
        window.sessionStorage.setItem(
          "userId",
          response.data.data[0]["user_id"]
        );
        window.sessionStorage.setItem(
          "userpwd",
          response.data.data[0]["user_password"]
        );
        console.log(response.data.data[0]);
        window.location = "/User";
      } else if (response.data.type === "owner") {
        window.sessionStorage.setItem(
          "ownerId",
          response.data.data[0]["powner_id"]
        );
        window.sessionStorage.setItem(
          "ownerpwd",
          response.data.data[0]["powner_password"]
        );
        var owner_id = sessionStorage.getItem("ownerId");
        axios
          .get("http://localhost:4000/ownercheck/" + owner_id)
          .then((response) => {
            var data = response.data.data[0];
            setData(data);
            var status = data.powner_status;
            if (status == "0") {
              alert("Your Request is not Approved...! Please try again Later");
            } else {
              axios
                .get("http://localhost:4000/pfacilityidsetting/" + owner_id)
                .then((response) => {
                  var data2 = response.data.data[0];
                  setData2(data2);
                  var pfacilityId = data2.pfacility_id;
                  window.sessionStorage.setItem("pfacilityId", pfacilityId);
                });
              window.location = "/Owner";
            }
          });
      } else if (response.data.type === "admin") {
        window.sessionStorage.setItem(
          "adminId",
          response.data.data[0]["admin_id"]
        );
        window.location = "/Admin";
      } else {
        alert("Invalid Credentials...!");
      }
    });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h2 className="loginHeader">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginFormWrapper">
            <div className="loginFormRow">
              <div className="loginFormLabel">E-Mail :</div>
              <div className="loginFormBox">
                <input
                  type="text"
                  className="loginFormInput"
                  ref={textInput1}
                  autoFocus
                />
              </div>
            </div>
            <div className="loginFormRow">
              <div className="loginFormLabel">Password :</div>
              <div className="loginFormBox">
                <input
                  type="password"
                  className="loginFormInput"
                  ref={textInput2}
                />
              </div>
            </div>
            <div className="loginFormRowBtnSubmit">
              <input
                type="submit"
                value="Sign In"
                className="loginFormSubmit"
                onClick={onSubmit}
              />
            </div>
          </div>
        </form>
        <div className="loginNewUserWrapper">
          <div className="loginNewUserTitle">
            New to <span className="loginNewUserTitleStyle1">park'in</span>Loop?
            <Link to="/SignUp" className="link">
              <span className="loginNewUserSignUpBtn">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
