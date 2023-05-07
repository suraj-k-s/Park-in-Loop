const express = require("express");
const mysql = require("mysql2");
const pars = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { text } = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_parkinloop",
  port: 3306,
});

//Check Database Connection

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(4000, () => {
  console.log("Server is Running");
});

//Admin District

app.post("/district", (req, res) => {
  let qry = `select * from tbl_district where district_name='${req.body.district_name}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Already Exist",
      });
    } else {
      let qry2 = `insert into tbl_district(district_name)values('${req.body.district_name}')`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          res.send({
            message: "Data Saved",
          });
        }
      });
    }
  });
});

app.get("/district", (req, res) => {
  let qry = `select * from tbl_district`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.delete("/district/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_district where district_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

app.get("/district/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_district where district_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Admin View Location

app.get("/location", (req, res) => {
  let qry = `select location_id,location_name,district_name,location_pincode from tbl_location,tbl_district where tbl_location.district_id=tbl_district.district_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.post("/location", (req, res) => {
  let qry = `select * from tbl_location where location_name='${req.body.location_name}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Name Already Exist",
      });
    } else {
      let qry2 = `select * from tbl_location where location_pincode='${req.body.location_pincode}'`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else if (result.length > 0) {
          res.send({
            message: "Pincode Already Exist",
          });
        } else {
          let qry3 = `insert into tbl_location(district_id,location_name,location_pincode)values('${req.body.district_id}','${req.body.location_name}','${req.body.location_pincode}')`;
          console.log(req);
          db.query(qry3, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
              res.send({
                message: "Data Saved",
              });
            }
          });
        }
      });
    }
  });
});

app.delete("/location/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_location where location_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Admin View userlist

app.get("/userlist", (req, res) => {
  let qry = `select tbl_user.user_id,user_name,user_email,user_contact, user_doj from tbl_user`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.delete("/userlist/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_user where user_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Admin View parkingfacilityList

app.get("/parkingfacilitylist", (req, res) => {
  let qry = `SELECT pfacility_id,pfacility_name,powner_email,powner_contact,location_name,pfacility_slots from tbl_parkingfacility,tbl_location,tbl_parkingowner WHERE tbl_parkingfacility.location_id=tbl_location.location_id AND tbl_parkingfacility.powner_id=tbl_parkingowner.powner_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.delete("/parkingfacilitylist/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_parkingfacility where pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Admin SIngle parkingfacilityview

//Account Details

app.get("/parkingfacility/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT pfacility_name,powner_name,powner_contact,powner_email,location_name,pfacility_slots,powner_doj FROM tbl_parkingowner,tbl_parkingfacility,tbl_location WHERE tbl_parkingowner.powner_id=tbl_parkingfacility.powner_id AND tbl_parkingfacility.location_id=tbl_location.location_id AND tbl_parkingfacility.pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Service Details

app.get("/parkingfacilityservice/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT pservice_id,servicetype_name,pservice_rate,pservice_description FROM tbl_servicetype,tbl_parkingservice WHERE tbl_servicetype.servicetype_id=tbl_parkingservice.servicetype_id AND tbl_parkingservice.pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Payment Details

app.get("/payment", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT user_name,pfacility_name,payment_date,total_amount FROM tbl_user,tbl_parkingfacility,tbl_payment,tbl_booking WHERE tbl_payment.booking_id=tbl_booking.booking_id AND tbl_booking.user_id=tbl_user.user_id AND tbl_booking.pfacility_id=tbl_parkingfacility.pfacility_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});


//Booking Details

app.get("/adminbookingview", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk LEFT JOIN tbl_user ur on bk.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf ON bk.pfacility_id = pf.pfacility_id INNER JOIN tbl_payment pt on bk.booking_id=pt.booking_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//ServiceType Details

app.post("/servicetype", (req, res) => {
  let qry = `select * from tbl_servicetype where servicetype_name = '${req.body.servicetype_name}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Already Exist",
      });
    } else {
      let qry2 = `insert into tbl_servicetype(servicetype_name)values('${req.body.servicetype_name}')`;
      console.log(req);
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          res.send({
            message: "Data Saved",
          });
        }
      });
    }
  });
});

app.get("/servicetype", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT servicetype_name,servicetype_id from tbl_servicetype`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.delete("/servicetype/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_servicetype where servicetype_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Feedback Details

app.get("/feedback", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT feedback_id,user_name,pfacility_name,feedback_date,feedback_content FROM tbl_feedback,tbl_user,tbl_parkingfacility WHERE tbl_feedback.user_id=tbl_user.user_id AND tbl_feedback.pfacility_id=tbl_parkingfacility.pfacility_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Single Feedback

app.get("/feedback/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_feedback fb INNER JOIN tbl_user ur on fb.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf ON fb.pfacility_id=pf.pfacility_id WHERE fb.feedback_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Complaint Details

app.get("/complaint", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT complaint_id,user_name,pfacility_name,complaint_date,complaint_replydate,complaint_status from tbl_complaint,tbl_user,tbl_parkingfacility WHERE tbl_complaint.pfacility_id=tbl_parkingfacility.pfacility_id and tbl_complaint.user_id=tbl_user.user_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Single Complaint Details

app.get("/complaint/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * from tbl_complaint,tbl_user,tbl_parkingfacility WHERE tbl_complaint.pfacility_id=tbl_parkingfacility.pfacility_id and tbl_complaint.user_id=tbl_user.user_id and tbl_complaint.complaint_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Pending Approvals

app.get("/pendingappr", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT powner_id,powner_name,powner_doj,powner_email,powner_contact from tbl_parkingowner where powner_status="0"`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

app.delete("/pendingappr/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_parkingowner where powner_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

app.put("/pendingappr/:id", (req, res) => {
  let id = req.params.id;
  let qry = `UPDATE tbl_parkingowner set powner_status="1" where powner_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Admin Payments View

app.get("/adminpayment", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_payment py INNER join tbl_booking bk on py.booking_id=bk.booking_id INNER JOIN tbl_parkingfacility pf on bk.pfacility_id=pf.pfacility_id LEFT JOIN tbl_user ur on bk.user_id=ur.user_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Admin view new Users

app.get("/adminnewusers", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_user ORDER by user_id DESC LIMIT 4`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Admin View Latest Booking

app.get("/adminnewbooking", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk INNER JOIN tbl_parkingfacility pf on bk.pfacility_id=pf.pfacility_id INNER JOIN tbl_user ur on bk.user_id=ur.user_id ORDER BY booking_id DESC LIMIT 3`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//GUEST

//User Registration

app.post("/userreg", (req, res) => {
  let qry = `select * from tbl_user where user_email = '${req.body.user_email}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Email Already Exist",
      });
    } else {
      let qry2 = `select * from tbl_user where user_contact = '${req.body.user_contact}'`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else if (result.length > 0) {
          res.send({
            message: "Contact Already Exist",
          });
        } else {
          let qry3 = `insert into tbl_user(user_name,user_email,user_contact,user_password,user_doj)
        values('${req.body.user_name}','${req.body.user_email}','${req.body.user_contact}','${req.body.user_password}',curdate())`;
          console.log(req);
          db.query(qry3, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
              res.send({
                message: "Data Saved",
              });
            }
          });
        }
      });
    }
  });
});

//ParkingOwner Registration

app.post("/parkownerreg", (req, res) => {
  let qry = `select * from tbl_parkingowner where powner_email='${req.body.powner_email}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Already Exist",
      });
    } else {
      let qry2 = `insert into tbl_parkingowner(powner_name,powner_email,powner_aadhaar,powner_location,powner_contact,powner_password,powner_doj)
    values('${req.body.powner_name}','${req.body.powner_email}','${req.body.powner_aadhaar}','${req.body.powner_location}','${req.body.powner_contact}','${req.body.powner_password}',curdate())`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          res.send({
            message: "Data Saved",
          });
        }
      });
    }
  });
});

//Login

app.post("/login", (req, res) => {
  let qry1 = `SELECT user_id,user_password from tbl_user where user_email='${req.body.email}' AND user_password='${req.body.password}'`;
  let qry2 = `SELECT powner_id, powner_password from tbl_parkingowner where powner_email='${req.body.email}' AND powner_password='${req.body.password}'`;
  let qry3 = `SELECT admin_id from tbl_admin where admin_email='${req.body.email}' AND admin_password='${req.body.password}'`;
  db.query(qry2, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: "owner",
      });
    }
  });
  db.query(qry3, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: "admin",
      });
    }
  });

  db.query(qry1, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: "user",
      });
    } else {
      res.end();
    }
  });
});

//OWNER

//Owner Status Check

app.get("/ownercheck/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingowner where powner_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: true,
      });
    } else {
      res.send({
        message: "No Data",
        type: false,
      });
    }
  });
});

//Owner ID setting on login

app.get("/pfacilityidsetting/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingfacility where powner_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data",
      });
    }
  });
});

//Add PArking Facility

app.post("/owneraddfacility", (req, res) => {
  let qry = `insert into tbl_parkingfacility(powner_id,pfacility_name,location_id,pfacility_slots,pfacility_rate,pfacility_landmark)
    values('${req.body.powner_id}','${req.body.pfacility_name}','${req.body.location_id}','${req.body.pfacility_slots}','${req.body.pfacility_rate}','${req.body.pfacility_landmark}')`;
  console.log(req);
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      var slots = req.body.pfacility_slots;
      let qry1 = `select max(pfacility_id) as id from tbl_parkingfacility`;
      db.query(qry1, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          var id = result[0].id;
          for (var i = 1; i <= slots; i++) {
            var a = "A" + i;
            let qry2 =
              "insert into tbl_slots(pfacility_id,slot_number)values('" +
              id +
              "','" +
              a +
              "')";

            db.query(qry2, (err, result) => {
              if (err) {
                console.log("Error");
              }
            });
          }
          res.send({
            message: "Data Retreived",
            data: id,
          });
        }
      });
    }
  });
});

//Facility Exist Checker

app.get("/ownerfacilitycheck/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingfacility where powner_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: true,
      });
    } else {
      res.send({
        message: "No Data",
        type: false,
      });
    }
  });
});

//Edit PArking Facility

app.get("/ownereditfacility/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingfacility b inner join tbl_location l inner join tbl_district d on b.location_id=l.location_id and l.district_id=d.district_id where pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

app.put("/ownereditfacility/:id", (req, res) => {
  let id = req.params.id;
  let qry = `UPDATE tbl_parkingfacility set pfacility_name='${req.body.pfacility_name}',pfacility_slots='${req.body.pfacility_slots}',pfacility_rate='${req.body.pfacility_rate}',pfacility_landmark='${req.body.pfacility_landmark}' where pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//Ajax District

app.get("/location/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_location where district_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Add Service

app.post("/owneraddservice", (req, res) => {
  let qry = `insert into tbl_parkingservice(servicetype_id,pfacility_id,pservice_rate,pservice_description)
    values('${req.body.servicetype_id}','${req.body.pfacility_id}','${req.body.pservice_rate}','${req.body.pservice_description}')`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//Service Check

app.get("/servicecheck/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingservice b inner join tbl_servicetype bm on b.servicetype_id=bm.servicetype_id where pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Edit Service

app.get("/parkingservice/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_parkingservice b INNER JOIN tbl_servicetype bm on b.servicetype_id=bm.servicetype_id where pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Delete Service

app.delete("/parkingservice/:id", (req, res) => {
  let id = req.params.id;
  let qry = `delete from tbl_parkingservice where pservice_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Deleted",
      });
    }
  });
});

//SLot Checking

app.get("/checkslot/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT slot_id from tbl_slots where slot_status=0 and pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: true,
      });
    } else {
      res.send({
        message: "No Data",
        data: result,
        type: false,
      });
    }
  });
});

//Owner Add Vehicle

app.post("/owneraddvehicle", (req, res) => {
  let qry = `insert into tbl_booking(user_id,pfacility_id,booking_vehicleno,entry_time,advance_amount,slot_id,exit_time,total_time,parking_amount,service_amount,booking_status)
    values(NULL,'${req.body.id}','${req.body.booking_vehicelno}',current_timestamp(),'0','${req.body.slot}',"","","","0",'1')`;

  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      let qry2 = `update tbl_slots set slot_status='2' where slot_id='${req.body.slot}'`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          let qry3 = `select max(booking_id) as id from tbl_booking`;
          db.query(qry3, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
              res.send({
                message: "Data Retreived",
                data: result,
              });
            }
          });
        }
      });
    }
  });
});

//Owner Add Vehicle Service

app.post("/owneraddvehicleservice/", (req, res) => {
  const booking_id = req.body.booking_id;
  const service = req.body.service;
  //console.log(service);
  const pfacility_id = req.body.pfacility_id;
  const len = service.length;
  // console.log(service[0]);
  let amount = 0;
  var sum = 0;

  for (var i = 0; i < len; i++) {
    let qryd = `select * from tbl_parkingservice where pservice_id='${service[i]}'`;
    //console.log(qryd);
    db.query(qryd, (err, result) => {
      var single = result[0].pservice_rate;
      var double = parseInt(single);
      sum = sum + double;
      let qrys = `update tbl_booking set service_amount='${sum}' where booking_id='${booking_id}'`;
      db.query(qrys, (err, result) => {
        if (err) {
          console.log("Error");
        }
      });
    });

    let qry = `insert into tbl_servicebooking(booking_id,pservice_id,pfacility_id)values('${booking_id}','${service[i]}','${pfacility_id}')`;
    db.query(qry, (err, result) => {
      if (err) {
        console.log("Error");
      }
    });
  }
  res.send({
    message: "Updated",
  });
});

//Owner View Active slots

app.get("/viewactiveslots/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_slots s INNER JOIN tbl_booking b on b.slot_id=s.slot_id WHERE s.slot_status=2 AND s.pfacility_id='${id}' and b.booking_status="1"`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Owner Update SLots

app.put("/slotupdate", (req, res) => {
  let qry = `UPDATE tbl_booking set exit_time=current_timestamp(), booking_status='2' where booking_id='${req.body.booking_id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      var time, rate, amount;
      let qry2 = `SELECT entry_time, exit_time, TIMEDIFF(exit_time, entry_time) as minutediff from tbl_booking where booking_id='${req.body.booking_id}'`;
      let qry3 = `SELECT * from tbl_booking bo INNER JOIN tbl_parkingfacility pf on bo.pfacility_id=pf.pfacility_id WHERE bo.booking_id='${req.body.booking_id}'`;
      db.query(qry2, (err, result) => {
        time = result[0].minutediff;
        const myArray = time.split(":");
        hour = myArray[0];

        db.query(qry3, (err, result) => {
          rate = result[0].pfacility_rate;
          amount = (parseInt(hour) + 1) * parseInt(rate);
          let qry4 = `update tbl_booking set parking_amount = ${amount}, total_time ='${time}' where booking_id ='${req.body.booking_id}'`;
          db.query(qry4, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
            }
          });
        });
        let qry5 = `select * from tbl_booking where slot_id = '${req.body.slot_id}' and booking_status ='0'`;
        db.query(qry5, (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length > 0) {
            let qry6 = `update tbl_slots set slot_status='1' where slot_id='${req.body.slot_id}'`;
            db.query(qry6, (err, result) => {
              if (err) {
                console.log("Error");
              } else {
                res.send({
                  message: "Updated",
                });
              }
            });
          } else {
            let qry7 = `update tbl_slots set slot_status = '0' where slot_id='${req.body.slot_id}'`;
            db.query(qry7, (err, result) => {
              if (err) {
                console.log("Error");
              } else {
                res.send({
                  message: "Updated",
                });
              }
            });
          }
        });
      });
    }
  });
});

//Owner Remove Active SLots

app.get("/removeactiveslots/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_booking b inner join tbl_slots s on b.slot_id = s.slot_id where booking_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Updated",
        data: result,
      });
    }
  });
});

//Owner Remove vehicle Payment

app.post("/ownervehiclepay", (req, res) => {
  let qry = `insert into tbl_payment(booking_id,total_amount,payment_date) values ('${req.body.id}','${req.body.total}',curdate())`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Saved",
      });
    }
  });
});

//OWner Vehicle Added

app.get("/vehicleadded/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_booking b INNER JOIN tbl_slots s on b.slot_id=s.slot_id WHERE booking_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Owner Complaint View

app.get("/ownercomplaint/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_complaint c INNER join tbl_user u on c.user_id=u.user_id where c.pfacility_id='${id}' order by c.complaint_status`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Owner Complaint give reply

app.put("/complaintreply/:id", (req, res) => {
  let id = req.params.id;
  let qry = `UPDATE tbl_complaint set complaint_status="Replied",complaint_reply="${req.body.complaint_reply}",complaint_replydate=curdate() where complaint_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Updated",
      });
    }
  });
});

//Owner Feedback View

app.get("/ownerfeedback/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_feedback c INNER join tbl_user u on c.user_id=u.user_id where c.pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Owner View Booking

app.get("/ownerbooking/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select * from tbl_booking b INNER JOIN tbl_slots s on b.slot_id=s.slot_id left join tbl_user ur on b.user_id=ur.user_id where b.booking_status='2' and b.pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//Owner Booking Pie Chart Direct

app.get("/ownerbookingpiedirect/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select count(booking_id) as directno from tbl_booking WHERE user_id IS NULL and pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Owner Booking Pie Chart User

app.get("/ownerbookingpieuser/:id", (req, res) => {
  let id = req.params.id;
  let qry = `select COUNT(booking_id) as userno from tbl_booking WHERE user_id IS NOT NULL and pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Owner Pending Vehicle

app.get("/pendingvehicle/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk INNER JOIN tbl_user ur on bk.user_id=ur.user_id WHERE bk.booking_status='0' and bk.pfacility_id='${id}' order by bk.entry_time`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});

//Owner Update Pending Vehicle

app.put("/updatepending/:id", (req, res) => {
  let id = req.params.id;
  let qry = `UPDATE tbl_booking set booking_status="1" where booking_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      let qry2 = `select slot_id from tbl_booking where booking_id='${id}'`;
      db.query(qry2, (err, result) => {
        var sid = result[0].slot_id;
        let qry3 = `update tbl_slots set slot_status='2' where slot_id='${sid}'`;
        db.query(qry3, (err, result) => {
          if (err) {
            console.log("Error");
          } else {
            res.send({
              message: "Data Updated",
              data: result,
            });
          }
        });
      });
    }
  });
});


app.put("/ownerchangepwd", (req, res) => {
  let qry = `update tbl_parkingowner set powner_password = '${req.body.npwd}' where powner_id = '${req.body.id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Updated",
      });
    }
  });
});

//USER

//User Search

app.post("/usersearching", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_location lo INNER JOIN tbl_parkingfacility pf on lo.location_id=pf.location_id where location_name like '${req.body.location_name}%'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
        type: true,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
        type: false,
      });
    }
  });
});

//User Search Result

app.get("/usersearchresult/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_parkingfacility pf INNER JOIN tbl_location l on pf.location_id=l.location_id WHERE pf.location_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

// User SLot Checking

app.get("/usercheckslot/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT slot_id from tbl_slots where slot_status='0' and pfacility_id='${id}'`;
  db.query(qry, (err, result) => {
    console.log(result.length);
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      var slot = result[0].slot_id;
      res.send({
        data: slot,
        type: true,
      });
    } else {
      res.send({
        type: false,
      });
    }
  });
});

//User Booking

app.post("/userbooking", (req, res) => {
  let qry = `insert into tbl_booking(user_id,pfacility_id,booking_vehicleno,entry_time,advance_amount,slot_id,exit_time,total_time,parking_amount,service_amount,booking_status)
    values('${req.body.user_id}','${req.body.pid}','${req.body.booking_vehicelno}','${req.body.booking_date}','0','${req.body.slotid}',"","","","0",'0')`;

  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      let qry2 = `update tbl_slots set slot_status='1' where slot_id='${req.body.slotid}'`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          let qry3 = `select max(booking_id) as id from tbl_booking`;
          db.query(qry3, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
              res.send({
                message: "Data Retreived",
                data: result,
              });
            }
          });
        }
      });
    }
  });
});

//User Booking Limit

app.post("/userbookinglimit", (req, res) => {
  let qry = `SELECT max(booking_id) as id from tbl_booking where booking_status ='0' AND pfacility_id='${req.body.pid}' group by slot_id`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      for (var i = 0; i < result.length; i++) {
        let qry4 = `select * from tbl_booking where booking_id = '${result[i].id}'`;
        db.query(qry4, (err, result) => {
          if (req.body.exit_date < result[0].entry_time) {
            res.end(result[0].slot_id);
          }
        });
      }
    }
  });
});

//User Booking Limit Entry

app.post("/userbookinglimitentry", (req, res) => {
  let qry = `insert into tbl_booking(user_id,pfacility_id,booking_vehicleno,entry_time,advance_amount,slot_id,exit_time,total_time,parking_amount,service_amount,booking_status)
  values('${req.body.user_id}','${req.body.pid}','${req.body.booking_vehicelno}','${req.body.booking_date}','0','${req.body.sid}','${req.body.exit_date}',"","","0",'0')`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      let qry2 = `update tbl_slots set slot_status='1' where slot_id='${req.body.slotid}'`;
      db.query(qry2, (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          let qry3 = `select max(booking_id) as id from tbl_booking`;
          db.query(qry3, (err, result) => {
            if (err) {
              console.log("Error");
            } else {
              res.send({
                message: "Data Retreived",
                data: result,
              });
            }
          });
        }
      });
    }
  });
});

//Advance Payemnt Form

app.get("/advancepayment/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk INNER JOIN tbl_user ur on bk.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf ON bk.pfacility_id=pf.pfacility_id where bk.booking_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        data: result,
      });
    }
  });
});

//Advance Payment

app.put("/advancepay", (req, res) => {
  let id = req.params.id;
  let qry = `UPDATE tbl_booking set payment_status="1",advance_amount="${req.body.rate}" where booking_id='${req.body.bid}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Updated",
      });
    }
  });
});

//User MyBookings

app.get("/mybookings/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk INNER JOIN tbl_user ur on bk.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf ON bk.pfacility_id=pf.pfacility_id inner join  tbl_location lc on pf.location_id=lc.location_id where bk.user_id='${id}' order by bk.entry_time`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        data: result,
      });
    }
  });
});

//Booking Status Check

app.get("/bookingstatuscheck/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_booking bk INNER join tbl_user ur on bk.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf on bk.pfacility_id=pf.pfacility_id inner join tbl_location lc on pf.location_id=lc.location_id inner join tbl_payment py on bk.booking_id = py.booking_id WHERE bk.booking_status='2' AND bk.booking_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else if (result.length > 0) {
      res.send({
        data: result,
        type: true,
      });
    } else {
      res.send({
        data: result,
        type: false,
      });
    }
  });
});

//Single Booking View

app.get("/bookingview/:id", (req, res) => {
  let id = req.params.id;
  let qry = `SELECT * FROM tbl_feedback fb INNER JOIN tbl_user ur on fb.user_id=ur.user_id INNER JOIN tbl_parkingfacility pf ON fb.pfacility_id=pf.pfacility_id WHERE fb.feedback_id='${id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    }
    if (result.length > 0) {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    } else {
      res.send({
        message: "No Data Found",
        data: result,
      });
    }
  });
});

//USer Give Feedback

app.post("/usergivefeedback", (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  let qry = `insert into tbl_feedback(pfacility_id,user_id,feedback_date,feedback_content) values ('${req.body.pid}','${req.body.uid}',curdate(),'${req.body.feedback}')`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Inserted",
      });
    }
  });
});

//User Give Complaint

app.post("/usergivecomplaint", (req, res) => {
  let qry = `insert into tbl_complaint(pfacility_id,user_id,booking_id,complaint_date,complaint_content,complaint_reply,complaint_replydate) values ('${req.body.pid}','${req.body.uid}','${req.body.bid}',curdate(),'${req.body.complaint}','','')`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Inserted",
      });
    }
  });
});

////User Complaint Reply View

app.get("/usercomplaintreplyview/:id", (req, res) => {
  var id = req.params.id;
  let qry = `select * from tbl_complaint where booking_id = '${id}'`;
  db.query(qry, (err, result) => {
    console.log(result);
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Retreived",
        data: result,
      });
    }
  });
});


//User Change Password

app.put("/userchangepwd", (req, res) => {
  let qry = `update tbl_user set user_password = '${req.body.npwd}' where user_id = '${req.body.id}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.log("Error");
    } else {
      res.send({
        message: "Data Updated",
      });
    }
  });
});
