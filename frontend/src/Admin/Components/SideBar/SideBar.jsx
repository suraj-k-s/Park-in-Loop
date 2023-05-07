import "./SideBar.css"
import {Home, Timeline, Person, DirectionsCar, AttachMoney, List, Feedback, ThumbUpAlt, Approval, LocationCity, AddLocation, CarRepair} from '@mui/icons-material';
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="sideBar">
        <div className="sideBarWrapper">
            <div className="sideBarMenu">
                <h4 className="sideBarTitle">Dashboard</h4>
                <ul className="sideBarList">
                    <Link to="/Admin/" className="link">
                    <li className="sideBarListItem">
                        <Home className="sideBarIcon"/>Home
                    </li>
                    </Link>
                    <li className="sideBarListItem">
                        <Timeline className="sideBarIcon"/>Analytics
                    </li>
                </ul>
            </div>  
            <div className="sideBarMenu">
                <h4 className="sideBarTitle">Quck Menu</h4>
                <ul className="sideBarList">
                    <Link to="/Admin/users" className="link">
                    <li className="sideBarListItem">
                        <Person className="sideBarIcon"/>Users
                    </li>
                    </Link>
                    <Link to="/Admin/parkingfacilities" className="link">
                    <li className="sideBarListItem">
                        <DirectionsCar className="sideBarIcon"/>Parking Facility
                    </li>
                    </Link>
                    <Link to="/Admin/Payment" className="link">
                    <li className="sideBarListItem">
                        <AttachMoney className="sideBarIcon"/>Payments
                    </li>
                    </Link>
                    <Link to ="/Admin/Bookings" className="link">
                    <li className="sideBarListItem">
                        <List className="sideBarIcon"/>Parkings
                    </li>
                    </Link>
                </ul>
            </div>  
            <div className="sideBarMenu">
                <h4 className="sideBarTitle">Registrations</h4>
                <ul className="sideBarList">
                    <Link to="/Admin/District" className="link">
                    <li className="sideBarListItem">
                        <LocationCity className="sideBarIcon"/>Disrict
                    </li>
                    </Link>
                    <Link to="/Admin/Location" className="link">
                    <li className="sideBarListItem">
                        <AddLocation className="sideBarIcon"/>Location
                    </li>
                    </Link>
                    <Link to="/Admin/ServiceType" className="link">
                    <li className="sideBarListItem">
                        <CarRepair className="sideBarIcon"/>Service Type
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="sideBarMenu">
                <h4 className="sideBarTitle">Notifications</h4>
                <ul className="sideBarList">
                    <Link to="/Admin/Feedback" className="link">
                    <li className="sideBarListItem">
                        <ThumbUpAlt className="sideBarIcon"/>Feedback
                    </li>
                    </Link>
                    <Link to="/Admin/Complaint" className="link">
                    <li className="sideBarListItem">
                        <Feedback className="sideBarIcon"/>Complaint
                    </li>
                    </Link>
                    <Link to="/Admin/PendingApprovals" className="link">
                    <li className="sideBarListItem">
                        <Approval className="sideBarIcon"/>Pending Approvals
                    </li>
                    </Link>
                </ul>
            </div>  
            
        </div>
    </div>
  )
}
