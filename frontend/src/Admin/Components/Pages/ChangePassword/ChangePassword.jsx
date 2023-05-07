import "./ChangePassword.css";
import { Link } from "react-router-dom";

export default function ChangePassword() {


  return (
    <div className="changePassword">
      <div className="changePasswordContainer">
        <h2 className="changePasswordTitle">Change Password</h2>
        <div className="changePasswordRow">
          <div className="changePasswordLabel">Current Password</div>
          <div className="changePasswordBox">
            <input
              type="text"
              className="changePasswordBoxElement"
              autoFocus
            />
          </div>
        </div>
        <div className="changePasswordRow">
          <div className="changePasswordLabel">New Password</div>
          <div className="changePasswordBox">
            <input type="text" className="changePasswordBoxElement"/>
          </div>
        </div>
        <div className="changePasswordRow">
          <div className="changePasswordLabel">Re-Enter New Password</div>
          <div className="changePasswordBox">
            <input type="text" className="changePasswordBoxElement"/>
          </div>
        </div>
        <div className="changePasswordRow">
          <div className="changePasswordLabel"></div>
          <div className="changePasswordBox">
            
              <input
                type="submit"
                value="Update"
                className="changePasswordSubmitButton"
              />
              <Link to="/Admin">
              <input
                type="submit"
                value="Cancel"
                className="changePasswordCancelButton"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
