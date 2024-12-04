import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Mood } from "../../pages/Dashboard"
import './UpdateForm.css'
interface ProductData {
    name: string;
    price: string;
    image_url?: string;
}
export default function UpdateForm() {
    const context=useContext(Mood)
  
    const{mood,}=context!
    // const{mood}=useContext(Mood)
    const navigat=useNavigate()
    const params=useParams()
    const [data,setdata]=useState<ProductData>({
        name: "",
        price: "",
        image_url: "",
    })
    const [productname,setproductname]=useState<string>()
    const [productprice,setproductprice]=useState<string>()
    const [productimage,setproductimage]=useState<File|null>()
    const [newimage,setnewimage]=useState<string|null>(null)
    
    useEffect(() => {
        axios.get(`https://vica.website/api/items/${params.id}`,{
            headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userdata')!).token}`}
            
        })
    
        .then(res=>{
            console.log(res)
            setdata(res.data)
            setproductname(res.data.name)
            setproductprice(res.data.price)})
           .then(console.log(data.name)!)
        
        .catch(error=>console.log(error))
    }, [])
    

    const handleImageChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
      
        const file=event.target.files?.[0]
        if (file) {
            setproductimage(file)
            setnewimage(URL.createObjectURL(file))
        }
        
       }

 
  
    // const handleImageChange =(event)=>{
        
    //     const file = event.target.files[0];
    // if (file) {
    //     setproductimage(file);  
    //     setSelectedImage(URL.createObjectURL(file));
    //     console.log(productimage)  
    // }
    //   }
      const send=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log(params.id)
        axios.post(`https://vica.website/api/items/${params.id}`,{name:productname,
            price:productprice,
            image:productimage,
            _method:"PUT"
        },
            {
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userdata')!).token}`,
            "Content-Type":"multipart/form-data"}
                
            }
        )
        .then(res=>{console.log(res)
            navigat('/')
        })
        .catch(error=>console.log(error))
      }
    return (
    <form className={`form${mood}`} onSubmit={(event)=>send(event)}>
    <div className='left'>
        <div>
            <label htmlFor="name">Product Name : </label>
            <input defaultValue={data.name} id='name' type="text" placeholder='Enter Product Name ' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setproductname(event.target.value)}} />
        </div>

        <div>
            <label htmlFor="price">Product Price : </label>
            <input defaultValue={data.price} id='price' type="text" placeholder='Enter Product Price' onChange={(event)=>{setproductprice(event.target.value)}} />
        </div>
        <div>
            <input type="submit" value="UpDate" />
        </div>
    </div>
    <div className='right'>
        <label htmlFor="image"><img style={{maxWidth:"150px"}} src={ newimage||data.image_url} alt="" /></label>
        <input onChange={(event)=>{ setproductimage(event.target.files![0]),handleImageChange(event)}} type="file" id='image'  />
    </div>
</form>
  )
}


{/* <input onChange={(event)=>{ setproductimage(event.target.files![0]),setnewimage(event),handleImageChange(event.target.files[0])}} type="file" id='image'  /> */}