import Chart from "../../Chart/Chart"
import FeaturedInfo from "../../FeaturedInfo/FeaturedInfo"
import "./Home.css"
import { userData } from "../../../../DummyData"
import WidgetSmall from "../../WidgetSmall/WidgetSmall"
import WidgetLarge from "../../WidgetLarge/WidgetLarge"

export default function Home() {
  return (
    <div className="home">
        <FeaturedInfo/>
        <Chart data={userData} title="User Analysis" dataKey="Active User" grid/>
        <div className="homeWidgets">
            <WidgetSmall/>
            <WidgetLarge/>
        </div>
    </div>
  )
}
