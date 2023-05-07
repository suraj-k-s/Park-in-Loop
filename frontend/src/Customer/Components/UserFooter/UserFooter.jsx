import { Copyright } from "@mui/icons-material"
import "./UserFooter.css"

export default function UserFooter() {
  return (
    <div className="userFooter">
        <div className="userFooterContainer">
            <p className="userFooterContent1">
                Having Trouble ? Contact Admin
            </p>
            <div className="userFooterCopyrightWrapper">
            <Copyright className="userFooterCopyright"/>park'inLoop
            </div>
        </div>
    </div>
  )
}
