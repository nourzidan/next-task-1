import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Mood } from "../../pages/Dashboard"
import './Card.css'
interface carditem{
    img:string
    name:string
    price:string
    id:string
    refreshproducts:()=>void

  }
  interface MoodContextType {
    mood: string;
}
export default function Card({img,name,price,id,refreshproducts}:carditem) {
    const{mood}=useContext(Mood) as MoodContextType
    const navigate = useNavigate()
    const edit=(id:string)=>{
  navigate(`product/${id}`)
    }
    const dell=(id:string)=>{
      const userData = localStorage.getItem('userdata');
        if (!userData) {
            console.error("No user data found in localStorage");
            return;
        }
        const token = JSON.parse(userData).token;
      axios.delete(`https://vica.website/api/items/${id}`,{
        
        headers:{Authorization:`Bearer ${token}`}}
      )
      .then(res=>{console.log(res)
    refreshproducts()})
      .catch(error=>console.log(error))
        }
    return (
    <div id={id} className={`card-div${mood}`}>
    <div className='img-div'><img src={img} alt="" /></div>
    <div className='name-div'><h2>{name}</h2></div>
    <div className='price-div'> <span>$</span><h3>{price}</h3></div>
    <div className='end-div'>
        <button className='ed' onClick={()=>{edit(id)} }>Edit Product</button>
        <button className='del-btn' onClick={()=>{dell(id)}}><i  className="fa-solid fa-trash-can"></i></button>
    </div>
</div>
  )
}
