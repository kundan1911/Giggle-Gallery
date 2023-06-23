import {MdEmail,AiFillCloseCircle} from '../../../../icons/icons'
import './ForgotPassword.css'
function ForgotPassword({setShowForgotPassword}){
    return (
        <section>
        <div className="flex absolute inset forgot-overlay ">
            <div className="relative forgot-password-card">
            <form action="" className="forgot-password-form">
                < AiFillCloseCircle onClick={()=>setShowForgotPassword(false)} className="icon close-icon size-xs" />
            <span className="flex heading txt-md lt-bold">Reset password</span>
            <p className="card-description txt-sm">Enter your email address and we will send you a link to reset your password.</p>
            <div className="w-100 input-with-icon">
                < MdEmail className="icon size-xs"/>
            <input type="email" placeholder="Email" className="input email-input" required />
            </div>
            <button type="submit" className="btn btn-sm link reset-password-btn">Send reset link</button>
            </form>
            </div>
            </div>
    </section>
    )
}
export {ForgotPassword};