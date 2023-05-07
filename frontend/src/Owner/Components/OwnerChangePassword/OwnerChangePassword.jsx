import "./OwnerChangePassword.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function OwnerChangePassword() {
  const [data, setData] = useState([]);

  var id = sessionStorage.getItem("ownerId");
  var pwd = sessionStorage.getItem("ownerpwd");
  console.log(pwd);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let textInput1 = useRef();
  let textInput2 = useRef();
  let textInput3 = useRef();

  const onSubmit = () => {
    var cpwd = textInput1.current.value;
    var npwd = textInput2.current.value;
    var rnpwd = textInput3.current.value;
    if (cpwd != pwd) {
      alert("Incorrect Current Password...!");
    } else if (npwd != rnpwd) {
      alert("Entered Password Do not Match...!!");
    } else {
      var dat = {
        id: id,
        cpwd: cpwd,
        npwd: npwd,
        rnpwd: rnpwd,
      };
      axios
        .put("http://localhost:4000/ownerchangepwd/", dat)
        .then((response) => {
            sessionStorage.setItem("ownerpwd",npwd)
          alert("Password Updated Successfully...!!");
          window.location="/Owner"
        });
    }
  };

  return (
    <div className="ownerChangePassword">
      <div className="ownerChangePasswordContainer">
        <h2 className="ownerChangePasswordTitle">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="ownerChangePasswordRow">
            <div className="ownerChangePasswordLabel">Current Password</div>
            <div className="ownerChangePasswordBox">
              <input
                type="password"
                className="ownerChangePasswordBoxElement"
                ref={textInput1}
                autoFocus
                required
              />
            </div>
          </div>
          <div className="ownerChangePasswordRow">
            <div className="ownerChangePasswordLabel">New Password</div>
            <div className="ownerChangePasswordBox">
              <input
                type="password"
                className="ownerChangePasswordBoxElement"
                ref={textInput2}
                required
              />
            </div>
          </div>
          <div className="ownerChangePasswordRow">
            <div className="ownerChangePasswordLabel">Re-Enter New Password</div>
            <div className="ownerChangePasswordBox">
              <input
                type="password"
                className="ownerChangePasswordBoxElement"
                ref={textInput3}
                required
              />
            </div>
          </div>
          <div className="ownerChangePasswordRow">
            <div className="ownerChangePasswordLabel"></div>
            <div className="ownerChangePasswordBox">
              <input
                type="submit"
                value="Update"
                className="ownerChangePasswordSubmitButton"
              />
              <Link to="/Admin">
                <input
                  type="submit"
                  value="Cancel"
                  className="ownerChangePasswordCancelButton"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
