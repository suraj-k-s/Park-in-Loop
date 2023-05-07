import "./AddDistrict.css";
import React, { Component } from "react";
import axios from "axios";

export default class AddDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: "",
    };
  }

  inputSet = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  saveData = (e) => {
    e.preventDefault();

    var dat = {
      district_name : this.state.district,
    };

    axios.post("http://localhost:4000/District/", dat).then((response) => {

    console.log(response.data.message);
        // window.location='/Admin/District';
        // alert("District Registered Successfully...!")
      
    });
  };
  render() {
    return (
      <div className="addDistrict">
        <div className="addDistrictContainer">
          <form id="districtForm" autoComplete="off">
            <h2 className="addDistrictTitle">District Registration</h2>
            <div className="addDistrictRow">
              <div className="addDistrictLabel">District Name</div>
              <div className="addDistrictBox">
                <input
                  type="text"
                  name="district"
                  onChange={this.inputSet}
                  className="addDistrictBoxElement"
                  required
                />
              </div>
            </div>
            <div className="addDistrictRow">
              <div className="addDistrictLabel"></div>
              <div className="addDistrictBox">
                <input
                  type="submit"
                  value="Register"
                  onClick={this.saveData}
                  className="addDistrictSubmitButton"
                />
                <input
                  type="submit"
                  value="Cancel"
                  className="addDistrictCancelButton"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
