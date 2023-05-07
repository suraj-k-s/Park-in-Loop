import "./UserChangePassword.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function UserChangePassword() {
  const [data, setData] = useState([]);

  var id = sessionStorage.getItem("userId");
  var pwd = sessionStorage.getItem("userpwd");

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
        .put("http://localhost:4000/userchangepwd/", dat)
        .then((response) => {
            sessionStorage.setItem("userpwd",npwd)
          alert("Password Updated Successfully...!!");
          window.location="/User"
        });
    }
  };

  return (
    <div className="userChangePassword">
      <div className="userChangePasswordContainer">
        <h2 className="userChangePasswordTitle">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userChangePasswordRow">
            <div className="userChangePasswordLabel">Current Password</div>
            <div className="userChangePasswordBox">
              <input
                type="password"
                className="userChangePasswordBoxElement"
                ref={textInput1}
                autoFocus
                required
              />
            </div>
          </div>
          <div className="userChangePasswordRow">
            <div className="userChangePasswordLabel">New Password</div>
            <div className="userChangePasswordBox">
              <input
                type="password"
                className="userChangePasswordBoxElement"
                ref={textInput2}
                required
              />
            </div>
          </div>
          <div className="userChangePasswordRow">
            <div className="userChangePasswordLabel">Re-Enter New Password</div>
            <div className="userChangePasswordBox">
              <input
                type="password"
                className="userChangePasswordBoxElement"
                ref={textInput3}
                required
              />
            </div>
          </div>
          <div className="userChangePasswordRow">
            <div className="userChangePasswordLabel"></div>
            <div className="userChangePasswordBox">
              <input
                type="submit"
                value="Update"
                className="userChangePasswordSubmitButton"
              />
              <Link to="/Admin">
                <input
                  type="submit"
                  value="Cancel"
                  className="userChangePasswordCancelButton"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
