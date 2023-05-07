import "./App.css";
import TopBar from "./Components/TopBar/TopBar";
import SideBar from "./Components/SideBar/SideBar";
import Home from "./Components/Pages/Home/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./Components/Pages/UserList/UserList";
import ParkingFacilityList from "./Components/Pages/ParkingFacilityList/ParkingFacilityList";
import ParkingFacility from "./Components/Pages/ParkingFacility/ParkingFacility";
import District from "./Components/Pages/Views/District/District"
import AddDistrict from "./Components/Pages/Registration/AddDistrict/AddDistrict";
import Location from "./Components/Pages/Views/Location/Location";
import AddLocation from "./Components/Pages/Registration/AddLocation/AddLocation";
import ServiceType from "./Components/Pages/Views/ServiceType/ServiceType";
import AddServiceType from "./Components/Pages/Registration/AddServiceType/AddServiceType";
import Payment from "./Components/Pages/Views/Payment/Payment";
import ChangePassword from "./Components/Pages/ChangePassword/ChangePassword";
import Feedback from "./Components/Pages/Views/Feedback/Feedback";
import SingleFeedbackView from "./Components/Pages/Views/SingleFeedbackView/SingleFeedbackView";
import Complaint from "./Components/Pages/Views/Complaint/Complaint";
import SingleComplaintView from "./Components/Pages/Views/SingleComplaintView/SingleComplaintView";
import PendingApprovals from "./Components/Pages/Views/PendingApprovals/PendingApprovals";

import React from "react";
import Booking from "./Components/Pages/Views/Booking/Booking";
function App() {
  return (
    <>
     <TopBar/>
     <div className="container">
      <SideBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/parkingfacilities" element={<ParkingFacilityList/>}/>
        <Route path="/parkingfacility/:id" element={<ParkingFacility/>}/>
        <Route path="/District" element={<District/>}/>
        <Route path="/addDistrict" element={<AddDistrict/>}/>
        <Route path="/Location" element={<Location/>}/>
        <Route path="/addLocation" element={<AddLocation/>}/>
        <Route path="/ServiceType" element={<ServiceType/>}/>
        <Route path="/addServiceType" element={<AddServiceType/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/Bookings" element={<Booking/>}/>
        <Route path="/ChangePassword" element={<ChangePassword/>}/>
        <Route path="/Feedback" element={<Feedback/>}/>
        <Route path="/SingleFeedbackView/:id" element={<SingleFeedbackView/>}/>
        <Route path="/Complaint" element={<Complaint/>}/>
        <Route path="/SingleComplaintView/:id" element={<SingleComplaintView/>}/>
        <Route path="/PendingApprovals" element={<PendingApprovals/>}/>




      </Routes>
     </div>
    </>
  );
}

export default App;
