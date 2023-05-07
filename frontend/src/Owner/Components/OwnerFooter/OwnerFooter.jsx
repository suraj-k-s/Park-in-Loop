import { Copyright } from "@mui/icons-material"
import "./OwnerFooter.css"

export default function GuestFooter() {
  return (
    <div className="guestFooter">
        <div className="guestFooterContainer">
            <p className="guestFooterContent1">
                Having Trouble ? Contact Admin
            </p>
            <div className="guestFooterCopyrightWrapper">
            <Copyright className="guestFooterCopyright"/>park'inLoop
            </div>
        </div>
    </div>
  )
}
