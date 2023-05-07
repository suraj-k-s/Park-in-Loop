import "./GuestTopBar.css";
import { Link } from "react-router-dom";

export default function GuestTopBar() {
  return (
    <div className="guestTopBar">
      <div className="guestTopBarTitle">
        <Link to="/" className="link">
          park'in<span className="guestTopBarTitleRight">Loop</span>
        </Link>
      </div>
      <div className="guestTopBarRight">
        <Link to="/Login">
          <input type="button" value="Sign In" className="guestTopBarSignIn" />
        </Link>
      </div>
    </div>
  );
}
