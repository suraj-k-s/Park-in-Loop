import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import UserAdvancePayment from "./Components/UserAdvancePayment/UserAdvancePayment"
import UserBookingSuccess from "./Components/UserBookingSuccess/UserBookingSuccess"
import UserBookingView from "./Components/UserBookingView/UserBookingView"
import UserChangePassword from "./Components/UserChangePassword/UserChangePassword"
import UserFooter from "./Components/UserFooter/UserFooter"
import UserHome from "./Components/UserHome/UserHome"
import UserMyBookings from "./Components/UserMyBookings/UserMyBookings"
import UserParkingBooking from "./Components/UserParkingBooking/UserParkingBooking"
import UserParkingBookingLimit from "./Components/UserParkingBookingLimit/UserParkingBookingLimit"
import UserSearchResult from "./Components/UserSearch/UserSearch"
import UserServiceBooking from "./Components/UserServiceBooking/UserServiceBooking"
import UserTopBar from "./Components/UserTopBar/UserTopBar"

export default function App() {
  return (
    <>
    <UserTopBar/>
    <Routes>
      <Route path="/" element={<UserHome/>}/>
      <Route path="/" element={<UserFooter/>}/>
      <Route path="/SearchResult" element={<UserSearchResult/>}/>
      <Route path="/MyBookings" element={<UserMyBookings/>}/>
      <Route path="/ParkingBooking" element={<UserParkingBooking/>}/>
      <Route path="/ParkingBookingLimit" element={<UserParkingBookingLimit/>}/>
      <Route path="/ServiceBooking" element={<UserServiceBooking/>}/>
      <Route path="/Payment" element={<UserAdvancePayment/>}/>
      <Route path="/BookingSuccess" element={<UserBookingSuccess/>}/>
      <Route path="/BookingView/:id" element={<UserBookingView/>}/>
      <Route path="/ChangePassword" element={<UserChangePassword/>}/>
      
    </Routes>
    
    
    </>
  )
}
