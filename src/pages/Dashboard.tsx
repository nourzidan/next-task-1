import { createContext, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import { sidebaritem } from "../data";
import { Outlet} from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import './Dashboard.css'

const sidelinks :sidebaritem[]=[
    {
        to:"/",
        icon:"fa-solid fa-border-all",
        title:"Products"
    },
    {
        to:"/favorites",
        icon:"fa-solid fa-heart",
        title:"Favorites"
    },
    {
        to:"/orders",
        icon:"fa-solid fa-list",
        title:"Orders"
    }]
    interface MoodContextType{
        mood:string;
        setmood:(value:string)=>void;
        searchQuery: string;
    setSearchQuery: (value: string) => void;

    }
    export const Mood=createContext<MoodContextType|null>(null)
export default function Dashboard() {
    const[mood,setmood]=useState('dark')
    const [searchQuery, setSearchQuery] = useState("")
  return (
    <>
    <Mood.Provider value={{mood,setmood, searchQuery, setSearchQuery}}>
    <div className="dashboard">
        <SideBar
        logo1='Dash'
        logo2='stack'
        links={sidelinks}/>
        <div className={`outlet-div${mood}`}>
            <NavBar/>
            <div className={`outlet${mood}`}>
              
            <Outlet/>
            
            </div>
        </div>
    </div>
    </Mood.Provider>
   
  
</>)
}
