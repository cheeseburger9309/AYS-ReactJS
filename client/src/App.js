//App
import React,{useContext,createContext,useState} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './pages/Main'
import Register from './pages/Register'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Contactus from './pages/Contactus'
import Salon from './pages/Salon'
import Appliances from './pages/Appliances'
import HomeCleaning from './pages/HomeCleaning'
import PackersAndMovers from './pages/PackersAndMovers'
import Construction from './pages/Construction';
import PestControl from './pages/PestControl';
import Painting from './pages/Painting';
import Plumbing from './pages/Plumbing';
import Profile from './pages/Profile';
import Cart from './pages/Cart'
import Orders from'./pages/Orders'
import Settings from './pages/Settings'
import PageNotFound from './pages/PageNotFound'
import OrderDetails from './pages/OrderDetails';




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const store=createContext();


function App() {
  const [cartItems,setCartItems] =useState([]);
  const [orderslist,setOrderslist] =useState([])
  const [userdetails,setUserDetails] =useState({email:"",password:""});

  return (
    <div className="App">
      <store.Provider value={[cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/ays/home" element={<Home/>}/>
          <Route path="/ays/about" element={<About/>}/>
          <Route path="/ays/contactus" element={<Contactus/>}/>
          <Route path="/ays/services/salon" element={<Salon/>}/>
          <Route path="/ays/services/homecleaning" element={<HomeCleaning/>}/>
          <Route path="/ays/services/packersandmovers" element={<PackersAndMovers/>}/>
          <Route path="/ays/services/appliances" element={<Appliances/>}/>
          <Route path="/ays/services/pestcontrol" element={<PestControl/>}/>
          <Route path="/ays/services/painting" element={<Painting/>}/>
          <Route path="/ays/services/plumbing" element={<Plumbing/>}/>
          <Route path="/ays/services/construction" element={<Construction/>}/>
          <Route path="/ays/cart" element={<Cart/>}/>
          <Route path="/ays/profile" element={<Profile/>}/>
          <Route path="/ays/orders" element={<Orders/>}/>
          <Route path="/ays/orders/:orderid" element={<OrderDetails/>}/>
          <Route path="/ays/settings" element={<Settings/>}/>

          <Route path="*" element={<PageNotFound/>}/>
       
        </Routes>
      </BrowserRouter>
      </store.Provider>
      <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </div>
  );
}


export default App;