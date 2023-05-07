import { Route, Routes } from "react-router-dom";
import GuestApp from "./Guest/App";
import UserApp from "./Customer/App";
import OwnerApp from "./Owner/App";
import AdminApp from "./Admin/App";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<GuestApp />} />
      <Route path="/User/*" element={<UserApp />} />
      <Route path="/Owner/*" element={<OwnerApp />} />
      <Route path="/Admin/*" element={<AdminApp />} />
    </Routes>
  );
}
