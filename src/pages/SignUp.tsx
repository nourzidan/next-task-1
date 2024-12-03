import Form from "../components/Form/Form"
import { inputitem } from "../data"
const signupinputs:inputitem[]=[
        {
            label:'First Name : ',
            type:'text',
            placeholder:'FirstName',
            classn:'FirstName',
            nameinapi:"first_name"
        },
        {
            label:'Last Name :',
            type:'text',
            placeholder:'LastName',
            classn:'LastName',
            nameinapi:"last_name"
        },
        {
            label:'User Name : ',
            type:'text',
            placeholder:'UserName',
            classn:'UserName',
            nameinapi:"user_name"
               
        },
        {
            label:'Email address :',
            type:'email',
            placeholder:'example@gmail.com',
            classn:'email',
            nameinapi:"email"
        },
        {
            label:'Password :',
            type:'password',
            placeholder:'*********',
            classn:'password',
            nameinapi:"password" 
        },
        {
            label:'Confirmation Password :',
            type:'password',
            placeholder:'*********',
            classn:'confirmationpassword',
            nameinapi:"password_confirmation"     
        },
        {
            label:'Profile Image :',
            type:'file',
            placeholder:''  ,
            classn:'profileimage',
            nameinapi:"profile_image"   
        }
    
    ]


function SignUp() {
  return (
    
        <Form 
        title="Create an Account"
        description="Create a account to continue"
        inputs={signupinputs}
        btn="Sign Up"
        end="Already have an account ? "
        link="Login"
        linkTo="/auth"
        url="https://vica.website/api/register"/>
    
  )
}

export default SignUp