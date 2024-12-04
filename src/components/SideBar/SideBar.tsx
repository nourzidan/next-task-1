
import { NavLink, useNavigate } from "react-router-dom"
import { sidebaritem } from "../../data"
import './SideBar.css'
import { useContext } from "react"
import { Mood } from "../../pages/Dashboard"
import axios from "axios"

interface sidebar{
    logo1:string,
    logo2:string,
    links?:Array<sidebaritem>
  }


export default function SideBar({logo1,logo2,links}:sidebar) {
    
    const context=useContext(Mood)
  
    const{mood,}=context!

  const navigate=useNavigate() 
  const logout=()=>{
      axios.post('https://vica.website/api/logout',null,{
        headers:{
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('userdata')!).token}`
        }
        
      })
      .then(res=>{
        console.log(res)
        localStorage.removeItem('userdata')
      navigate('/auth',{state:{message:'loged out '}})})
      .catch(error=>console.log(error))
    }
    return (
    <div className={`sidebar${mood}`}>
        
        <h1 className="h1-logo-1">{logo1}<span className="h1-logo-2">{logo2}</span></h1>
        <div className="links-div">
        {links?.map((element,index)=>{
            return(
                <div key={index}>
                      <i className={element.icon}></i>
                      <NavLink
                to={element.to}
                className={({ isActive}) =>
                  isActive ? "active" : ""
                }
              >
                {element.title}
              </NavLink> 
                </div>
              
            )
        })}</div>
        <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}
