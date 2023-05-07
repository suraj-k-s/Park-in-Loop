import { Search } from "@mui/icons-material";
import "./GuestHome.css";
import GuestImg from "../../../Assets/guestparkingimg.jpg";
import { Link } from "react-router-dom";
import img from "../../../Assets/map.png"

export default function GuestHome() {
  return (
    <div className="guestHome">
      <div className="guestHomeMainContainer">
        <h3 className="guestHomeOffer">
          Upto 50% Off on First Booking{" "}
          <span className="guestHomeOfferLimit">*</span>
        </h3>
        <div className="guestHomeBanner">
          <h3 className="guestHomeBannerText">FIND YOUR PARKING SPACE NOW</h3>
          <div className="guestHomeBannerSearchContainer">
            <input
              type="search"
              placeholder="Enter the city name"
              className="guestHomeBannerSearchBox"/>
              <Link to="/Login" className="link">
            <Search className="guestHomeBannerSearchBtn" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="guestHomeMapContainer">
        <div className="guestHomeMapTitleWrapper">
          <p className="guestHomeMapTitle">
            Most accurate Parking Space Finder in the World
          </p>
        </div>
        <div className="guestHomeMapWrapper">
          <img src={img} alt="" className="guestHomeMap"/>
        </div>
      </div>
      <div className="guestHomeBottomContainer">
        <h2 className="guestHomeBottomTitle">
          Do You Have A Parking Facility ?
        </h2>
        <div className="guestHomeBottom">
          <div className="guestHomeBottomContentWrapper">
            <div className="guestHomeBottomContent">
              A parking space, parking place or parking spot is a location that
              is designated for parking, either paved or unpaved. It can be in a
              parking garage, in a parking lot or on a city street. The space
              may be delineated by road surface markings. The automobile fits
              inside the space, either by parallel parking, perpendicular
              parking or angled parking.
            </div>
            <div className="guestHomeBottomContentButtonWrapper">
              <h4 className="guestHomeBottomContentMember">
                Join the <span className="guestHomeBottomText1">park'in</span>
                <span className="guestHomeBottomtext2">Loop</span> Family
                <span className="guestHomeBottomContentButtonContainer">
                  <Link to="/ParkingSignUp" className="link">
                    <input
                      type="button"
                      value="Register Now"
                      className="guestHomeBottomContentButton"
                    />
                  </Link>
                </span>
              </h4>
            </div>
          </div>
          <div className="guestHomeBottomImgContainer">
            <img src={GuestImg} alt="" className="guestHomeBottomImg" />
          </div>
        </div>
      </div>
    </div>
  );
}
