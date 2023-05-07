import "./SignUp.css"
import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className="signUp">
        <div className="signUpContainer">
            <Link to="/UserSignUp" className="link">
            <div className="signUpUserContainer">
                <h2 className="signUpUserContainerTitle">SignUp as a User</h2>
                <p className="signUpUserContainerText">
                    Sign Up to park'inLoop to enjoy unlimited parking space booking at discounted rate
                </p>
                <div className="signUpUserContainerRequiredContainer">
                    <h3 className="signUpUserContainerRequiredTitle">Required Details</h3>
                    <ul className="signUpUserContainerRequiredList">
                        <li className="signUpUserContainerRequiredItem">
                            Email-Id*
                        </li>
                        <li className="signUpUserContainerRequiredItem">
                            Contact Number*
                        </li>
                        <li className="signUpUserContainerRequiredItem">
                            Account Details
                        </li>
                    </ul>
                </div>
            </div>
            </Link>
            <Link to="/ParkingSignUp" className="link">
            <div className="signUpParkingContainer">
                <h2 className="signUpParkingContainerTitle">Have a Parking Space ?</h2>
                <p className="signUpParkingContainerText">
                    Register Parking facility & Provide services to the Customers and enjoy 
                </p>
                <div className="signUpParkingContainerRequiredContainer">
                    <h3 className="signUpParkingerContainerRequiredTitle">Required Details</h3>
                    <ul className="signUpParkingContainerRequiredList">
                        <li className="signUpParkingContainerRequiredItem">
                            Email-Id*
                        </li>
                        <li className="signUpParkingContainerRequiredItem">
                            Contact Number*
                        </li>
                        <li className="signUpParkingContainerRequiredItem">
                            Location*
                        </li>
                    </ul>
                </div>
            </div>
            </Link>
        </div>
        <div className="signUpRequiredWrapper">
                *Mandatory 
            </div>
    </div>
  )
}
