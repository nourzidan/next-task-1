import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Mood } from "./Dashboard"
import Card from "../components/Card/Card"
import './ReadProdects.css'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface ProductItem {
    id: string
    name: string
    price: string
    image_url: string 
  }
export default function ReadProdects() {
  const context=useContext(Mood)
  const{mood,searchQuery}=context!
    // const{mood, searchQuery}=useContext(Mood)
  const location=useLocation()
  const navigate = useNavigate()
  const goToCreate=()=>{
    navigate('/create')
  }
  const [products,setproducts]=useState<ProductItem[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
  const fetchproducts=()=>{
    axios.get('https://vica.website/api/items',{
      headers:{
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userdata')!).token}`
      }
     })
     .then(res=>{
      console.log(res)
      setproducts(res.data)
      
      
      

     })
     
     .catch(error=>console.log(error))
  }
  useEffect(() => {
  //  axios.get('https://vica.website/api/items',{
  //   headers:{
  //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('userdata')).token}`
  //   }
  //  })
  //  .then(res=>{
  //   console.log(res)
  //   setproducts(res.data)
  //  })
   
  //  .catch(error=>console.log(error))
  if (location.state?.message) {
      toast.success(location.state.message)
  }
  fetchproducts()
  // toast.success('hii')
  }, [])

  useEffect(() => {
    // Filter products when searchQuery changes
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
}, [searchQuery, products]);

  return (
    <>
    <div className={`read${mood}`}> 
      <div className='top'>
        <h1>All Products</h1>
        <button onClick={()=>goToCreate()}>create product</button>
      </div>
      {/* <div className='bottom-div'>
      {(products)?products.map((element,index)=>{
        return(
          <Card id={element.id} key={index}  img={element.image_url} name={element.name}
          price={element.price} refreshproducts={fetchproducts}/>
        )
      }):
      <h1 style={{textAlign:"center"}}>There are no products ...</h1>}
      
    
      </div> */}
      <div className="bottom-div">
          {/* Display filtered products if available; otherwise display all products */}
          {(filteredProducts.length > 0 ? filteredProducts : products).map((element, index) => (
            <Card
              id={element.id}
              key={index}
              img={element.image_url}
              name={element.name}
              price={element.price}
              refreshproducts={fetchproducts}
            />
          ))}
          {/* Fallback message if no products */}
          {filteredProducts.length === 0 && products.length === 0 && (
            <h1 style={{ textAlign: "center" }}>There are no products...</h1>
          )}
        </div>

    </div>
    <ToastContainer/>
    </>
  )
}
