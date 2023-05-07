import React from 'react'
import './TopBar.css'
import Img from "../../../Assets/admin.jpg";
import {Login, Notifications} from "@mui/icons-material";
import { Link } from 'react-router-dom';
export default function TopBar() {

    const logout = () =>{
        sessionStorage.removeItem('userId');
        window.location= "/"
      }

  return (
    <div className='topBar'> 
        <div className="topBarWrapper">
            <div className="topLeft">
                <Link to ="/Admin" className='link'>
                <span className="logo">park'in Loop</span>
                </Link>
            </div>
            <div className="topRight">
                <Link to ="/Admin/PendingApprovals">
                <div className="topBarIconsContainer">
                    <Notifications/>
                    {/* <span className="topIconBadge">4</span> */}
                </div>
                </Link>
                <div className="topBarIconsContainer">
                    
                    <Login onClick={()=>logout()}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

