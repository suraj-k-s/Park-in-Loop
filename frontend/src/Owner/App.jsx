import "./App.css"
import OwnerHome from "./Components/OwnerHome/OwnerHome"
import OwnerTopBar from "./Components/OwnerTopBar/OwnerTopBar"
import OwnerFooter from "./Components/OwnerFooter/OwnerFooter"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OwnerAddParking from "./Components/OwnerAddParking/OwnerAddParking"
import OwnerEditParking from "./Components/OwnerEditParking/OwnerEditParking"
import OwnerAddService from "./Components/OwnerAddService/OwnerAddService"
import OwnerEditService from "./Components/OwnerEditService/OwnerEditService"
import OwnerAddVehicle from "./Components/OwnerAddVehicle/OwnerAddVehicle"
import OwnerAddVehicleService from "./Components/OwnerAddVehicleService/OwnerAddVehicleService"
import OwnerVehicleAdded from "./Components/OwnerVehicleAdded/OwnerVehicleAdded"
import OwnerMySpace from "./Components/OwnerMySpace/OwnerMySpace"
import OwnerViewActiveSlots from "./Components/OwnerViewActiveSlots/OwnerViewActiveSlots"
import OwnerViewBooking from "./Components/OwnerViewBooking/OwnerViewBooking"
import OwnerAnalysis from "./Components/OwnerAnalysis/OwnerAnalysis"
import OwnerRemoveVehicle from "./Components/OwnerRemoveVehicle/OwnerRemoveVehicle"
import OwnerFeedback from "./Components/OwnerFeedback/OwnerFeedback"
import OwnerFeedbackView from "./Components/OwnerFeedbackView/OwnerFeedbackView"
import OwnerComplaint from "./Components/OwnerComplaint/OwnerComplaint"
import OwnerComplaintView from "./Components/OwnerCompaintView/OwnerComplaintView"
import OwnerPendingVehicle from "./Components/OwnerPendingVehicle/OwnerPendingVehicle"
import OwnerChangePassword from "./Components/OwnerChangePassword/OwnerChangePassword"

export default function App() {
  return (
    <>
    <OwnerTopBar/>
    <Routes>
        
      <Route path="/" element={<OwnerHome/>}/>
      <Route path="/AddParkingSpace" element={<OwnerAddParking/>}/>
      <Route path="/EditParkingSpace" element={<OwnerEditParking/>}/>
      <Route path="/AddService" element={<OwnerAddService/>}/>
      <Route path="/EditService" element={<OwnerEditService/>}/>
      <Route path="/AddVehicle" element={<OwnerAddVehicle/>}/>
      <Route path="/AddVehicleService" element={<OwnerAddVehicleService/>}/>
      <Route path="/OwnerVehicleAdded" element={<OwnerVehicleAdded/>}/>
      <Route path="/OwnerMySpace" element={<OwnerMySpace/>}/>
      <Route path="/ViewActiveSlots" element={<OwnerViewActiveSlots/>}/>
      <Route path="/ViewBookings" element={<OwnerViewBooking/>}/>
      <Route path="/OwnerAnalysis" element={<OwnerAnalysis/>}/>
      <Route path="/RemoveVehicle/:id" element={<OwnerRemoveVehicle/>}/>
      <Route path="/OwnerFeedback" element={<OwnerFeedback/>}/>
      <Route path="/OwnerFeedbackView/:id" element={<OwnerFeedbackView/>}/>
      <Route path="/OwnerComplaint" element={<OwnerComplaint/>}/>
      <Route path="/OwnerComplaintView/:id" element={<OwnerComplaintView/>}/>
      <Route path="/OwnerPendingVehicle" element={<OwnerPendingVehicle/>}/>
      <Route path="/OwnerChangePwd" element={<OwnerChangePassword/>}/>
        
        </Routes>
        <OwnerFooter/>
    </>
  )
}
