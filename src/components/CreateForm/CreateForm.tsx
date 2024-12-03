import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mood } from "../../pages/Dashboard"
import './CreateForm.css'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function CreateForm() {
    const{mood}=useContext(Mood)
    const [name,setname]=useState('')
    const [price,setprice]=useState(0)
    const [image,setimag]=useState(null)
    const [newimage,setnewimage]=useState(null)
    // const[data,setdata]=useState({
    //     name:'',
    //     price:"",
    //     image:null
    // })
    const handleImageChange =(event)=>{
      
     setnewimage(URL.createObjectURL(event))
    }
   const navigate=useNavigate()
    // const send=(event)=>{
    //     event.preventDefault()
    //     console.log(
    //         {name:name,
    //         price:price,
    //         image:image

    //     })
    //     // navigate("/")
    // }
    const send=(event)=>{
        event.preventDefault()
        console.log(
          {name:name,
            price:price,
            image:image
          })
          axios.post('https://vica.website/api/items',{
            name:name,
            price:price,
            image:image
          },{
            headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userdata')).token}`,
            "Content-Type":"multipart/form-data"}
            
        })
        .then(res=>{console.log(res)
          console.log(image)
         
            navigate("/",{state:{message:'your proudect created successfully '}})
            
           
            
        })
        
        
        .catch(error=>console.log(error))
        
    }
    return (
    <>
    <div className={`head${mood}`}><h1>Create Product</h1></div>
    <form className={`form${mood}`} onSubmit={(event)=>send(event)}>
        <div className='left'>
            <div>
                <label htmlFor="name">Product Name : </label>
                <input id='name' type="text" placeholder='Enter Product Name ' onChange={(event)=>setname(event.target.value)}/>
            </div>

            <div>
                <label htmlFor="price">Product Price : </label>
                <input id='price' type="text" placeholder='Enter Product Price' onChange={(event)=>setprice(event.target.value)}/>
            </div>
            <div>
                <input type="submit" value="Create" />
            </div>
        </div>
        <div className='right'>
            <label htmlFor="image"><img style={{maxWidth:"150px"}} src={newimage||"/public/assets/icons/upload.svg"} alt="" /></label>
            <input type="file" id='image' onChange={(event)=>{setimag(event.target.files[0]),setnewimage(event.target.files[0]),handleImageChange(event.target.files[0])}} />
        </div>
    </form>
    <ToastContainer/>

    </>
  )
}
