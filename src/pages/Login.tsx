
import { useLocation } from "react-router-dom"
import Form from "../components/Form/Form"
import { inputitem } from "../data"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const logininputs:inputitem[]=[
    {
        label:'Email address :',
        type:'email',
        placeholder:'example@gmail.com',
        nameinapi:"email"
    },
    {
        label:'Password :',
        type:'password',
        placeholder:'********',
        nameinapi:"password"
    }]

function Login() {
  const location=useLocation()
 
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message)
  }
  }, [])
  
 
  return (
    <>
    <div>
        <Form
        title="Login to Account"
        description="please enter your email and password to continue"
        inputs={logininputs}
        btn="Sign in"
        end="Don't have an account?"
        link="Create Account"
        linkTo="signUp"
        url="https://vica.website/api/login"/>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login