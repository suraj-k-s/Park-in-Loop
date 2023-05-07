import { Login, Settings } from "@mui/icons-material"
import { Link } from "react-router-dom"
import "./UserTopBar.css"

export default function UserTopBar() {

  const logout = () =>{
    sessionStorage.removeItem('userId');
    window.location.replace("/")
  }

  return (
    <div className="userTopBar">
        <div className="userTopBarTitle">
        <Link to="/User" className="link">
          park'in<span className="userTopBarTitleStyle1">Loop</span>
        </Link>
        </div>
        
        <div className="userTopBarOthersWrapper">
          <div className="userTopBarOthers">
          <Link to="/User/MyBookings" className="link">
            My Bookings
            </Link>
          </div>
          
          <div className="userTopBarOthers">
          <div className="dropdown">
            <Settings className="userTopBarOthersIcon"/>
            <div className="dropdown-content">
                    <Link to="/User/ChangePassword">Change Password</Link>
                    <a onClick={() =>logout()}>Sign Out<Login/></a>
                </div>
                </div>
          </div>
        </div>
    </div>
  )
}
