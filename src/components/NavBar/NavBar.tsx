import { useContext, useState } from "react"
import { Mood } from "../../pages/Dashboard"
import './NavBar.css'

export default function NavBar() {

    // const userinfo=JSON.parse(localStorage.getItem('userdata'))

    const userinfo = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")!)
    : null;

    const profileimage=userinfo.user.profile_image_url
    const firstname=userinfo.user.first_name
    const lasttname=userinfo.user.last_name
    const username=userinfo.user.user_name
    // const [mood,setmood]=useState('dark')
    const{mood,setmood, searchQuery, setSearchQuery}=useContext(Mood)
    const [moon,setmoon]=useState(true)
    const [sun,setsun]=useState(false)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
  };
  
    function tog() {
      setmoon(!moon)
      setsun(!sun)
      setmood(moon ? 'light' : 'dark');
      
    }

  return (
    <nav className={`${mood} `}>
    <div className='serch-div '>
      <label htmlFor="serch"></label>
      <input type="search"
              id='serch'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."/>
    </div>
    <div className='right-div'>
      <img src={profileimage}  alt="" />
      <div className='name-div'>
      <h3>{firstname}<span>{lasttname}</span></h3>
      <h4>{username}</h4>
      </div>
      <div className='mood-div' >
        <button className={`${moon} btn-mood`} onClick={()=>tog()}><i className={`fa-solid fa-moon `} ></i></button>
        <button className={`${sun} btn-mood`} onClick={()=>tog()}><i className={`fa-solid fa-sun `} ></i></button>
      </div>

    </div>
    
   </nav>
  )
}
