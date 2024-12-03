import { Outlet } from "react-router-dom";
import './Auth.css'

export default function Auth() {
  return (
    <div className="auth">
        <Outlet/>
    </div>
  )
}
