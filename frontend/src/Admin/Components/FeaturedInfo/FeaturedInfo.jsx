import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./FeaturedInfo.css"

export default function FeaturedInfo() {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$6.39</span>
                <span className="featuredMoneyRate">
                    -22.4<ArrowDownward className="featuredIcon negative"/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Bookings</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">1208</span>
                <span className="featuredMoneyRate">
                    -1.4<ArrowDownward className="featuredIcon negative"/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">AVerage Rate</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$5</span>
                <span className="featuredMoneyRate">
                    2.4<ArrowUpward className="featuredIcon"/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
    </div>
  )
}
