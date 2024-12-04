
import { Link, useNavigate } from "react-router-dom"
import { inputitem } from "../../data"
import { useEffect, useState } from "react"
import './Form.css'


interface forminputs{
  title:string,
  description:string,
  inputs:Array<inputitem>,
  btn:string,
  end:string,
  link:string,
  linkTo:string,
  url:string
}

function Form({title,description,btn,inputs,end,link,linkTo,url}:forminputs) {
  
  const navigate=useNavigate()
  let keys = {}
  let keysdata = new FormData()
  const[data,setdata]=useState((inputs.length<2)?keys:keysdata)

  const [selectedImage, setSelectedImage] = useState<string|null>(null);
 
  useEffect(() => {
  for (let index = 0; index < inputs.length; index++) {
    // (inputs.length<2)?
    // (keys={...keys,[inputs[index].nameinapi]:null}):
    // (keysdata.append(inputs[index].name,null))
    (keys={...keys,[inputs[index].nameinapi]:null})
  } 
  (inputs.length<2)?
 ( setdata(keys)):
 (setdata(keysdata))
}, [])
const handelData=(name:string,value:string|File)=>{
  (inputs.length<2)?
  setdata({...data,[name]:value}) :
  keysdata.append(name,value)

  // console.log("Data being sent (FormData):");
  // for (let pair of data.entries()) {
  //   console.log(`${pair[0]}:`, pair[1]);
  // }
}

const handleImageChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
  const file=event.target.files?.[0];
  if(file){
  setSelectedImage(URL.createObjectURL(file))}
}


const send=(event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  // console.log("Data being sent (FormData):");
  // for (let pair of data.entries()) {
  //   console.log(`${pair[0]}:`, pair[1]);
  // }
  let headers1={}
  let body1:BodyInit|null=null
  if (inputs.length<2){
    headers1={"content-type" : "application/json"}
    body1=JSON.stringify(data)
  }else{
    
    body1=data as FormData
  }

  fetch(url,{
    method:"POST",
     headers:headers1
    
    ,
    body: body1
  })
  
  .then(res=>res.json())
  .then(res=>{if (inputs.length>2) {
    localStorage.setItem('userdata',JSON.stringify(res.data))
   
    navigate('/',{state:{message:"you created your account successfully"}}) 

  }
  else{
    localStorage.setItem('userdata',JSON.stringify(res))
    
    navigate('/',{state:{message:'you signed in successfully'}}) 
    
    
  }
})
  .catch(error=>console.log(error))
}
  
  return (
    <>
    <form onSubmit={(event)=>send(event)}>
       <h1>{title}</h1>
       <p>{description}</p>
       <div className={(inputs.length>2)?"sign-up-form":undefined}>
        {inputs?.map((element,index)=>{
            
            return(
                <div className={element.classn} key={index} >
                    
                <label htmlFor={index.toString()}>{element.label}</label>
                {(element.type=="file")? <label htmlFor={index.toString()}><img src={ selectedImage || "/assets/profile-avatar.png"} alt="" /></label>: null}
                <input
  onChange={(event) => {
    if (element.type !== "file") {
      
      handelData(element.nameinapi, event.target.value);
    } else {
     
      const file = event.target.files?.[0]; 
      if (file) {
        handelData(element.nameinapi, file); 
        handleImageChange(event); 
      }
    }
  }}
  id={index.toString()} 
  type={element.type} 
  placeholder={element.placeholder} 
  style={{ display: (element.type === "file") ? "none" : "block" }} 
/>
                </div>
            )
        })}
        </div> 

        <div className='end-div'>
        <input type="submit" value={btn} />
        <span>{end}</span><Link to={linkTo}>{link}</Link>
        </div>
    </form>
    
    </>
  )
}

export default Form