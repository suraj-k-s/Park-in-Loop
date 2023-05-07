import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GuestFooter from "./Components/GuestFooter/GuestFooter";
import GuestHome from "./Components/GuestHome/GuestHome";
import GuestTopBar from "./Components/GuestTopBar/GuestTopBar";
import Login from "./Components/Login/Login";
import ParkingSignUp from "./Components/ParkingSignUp/ParkingSignUp";
import SignUp from "./Components/SignUp/SignUp";
import UserSignUp from "./Components/UserSignUp/UserSignUp";

export default function App() {
  return (
    <>
      <GuestTopBar />
      <Routes>
        <Route path="/" element={<GuestHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserSignUp" element={<UserSignUp />} />
        <Route path="/ParkingSignUp" element={<ParkingSignUp />} />
      </Routes>
      <GuestFooter />
    </>
  );
}
