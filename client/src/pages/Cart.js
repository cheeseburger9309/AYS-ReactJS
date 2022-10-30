import React, { useState, useContext, useEffect } from "react";
import HomeNav from "../components/HomeNav.js";
import { store } from "../App.js";
import CartItem from "../components/CartItem.js";
import "./css/Cart.css";
import {useNavigate} from 'react-router-dom'
import CartAnimation from "./Images/CartAnimation.gif"


function Cart() {

  const [sum,setSum]=useState(0);
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [stateMsg, setStateMsg] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [address1Msg, setAddress1Msg] = useState("");
  
  const globalState = useContext(store);
  const [cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist] = globalState;


  const [listItems,setListItems]=useState([])


  const [orderItems,setOrderItems] =useState({add_name:"",add_email:"",add_phone:"",add_address1:"",add_address2:"",add_state:"",add_pincode:"",add_date:"",add_orderItems:[],add_total:0});
 
  const navigate = useNavigate();
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setOrderItems({ ...orderItems, [name]: value });

    var date=new Date();  
    var day=date.getDate();  
    var month=date.getMonth()+1;  
    var year=date.getFullYear();  
    var today=day+"-"+month+"-"+year;
      
    var h=date.getHours();  
    var m=date.getMinutes();  
    //var s=date.getSeconds();  
    var time=h+":"+m;
    var dateTime=today+" "+time;
    setOrderItems(previtem=>{
      return {...previtem,add_date:dateTime,add_orderItems:cartItems}
      })
  };

  const submitHandlerCart=(e)=>{
    e.preventDefault();
  
    if(cartItems.length <= 0){
      alert("Please add items to cart")
    }
    else if(orderItems.add_name===""){
      //alert("Please enter your name");
      setNameMsg("Enter your name!");
    }
    else if(orderItems.add_email==="" || !orderItems.add_email.includes("@")){
     // alert("Please enter valid email");
      setEmailMsg("Enter valid email!");
    }
    else if(orderItems.add_phone==="" || !orderItems.add_phone.match(/^[0-9]{10}$/)){
      //alert("Please enter your phone number");
      setPhoneMsg("Enter valid phone number!");
    }
    else if(orderItems.add_address1===""){
      //alert("Please enter your address");
      setAddress1Msg("Enter your address!");
    }
    else if(orderItems.add_state===""){
     // alert("Please enter your state");
      setStateMsg("Enter your state!");
    }
    else if(orderItems.add_pincode==="" || !orderItems.add_pincode.match(/^[0-9]{6}$/)){
      //alert("Please enter your pincode");
      setPincodeMsg("Enter valid pincode!");
    }
    else{
    
      //setOrderItems({...orderItems,});
      console.log(orderItems);
      orderItems.add_orderItems.map((cartItem)=>{
        console.log("1")
        setOrderslist((prevlist)=>{
          return(
          [...prevlist,{add_name:orderItems.add_name,add_email:orderItems.add_email,add_phone:orderItems.add_phone,add_address1:orderItems.add_address1,add_address2:orderItems.add_address2,add_state:orderItems.add_state,add_pincode:orderItems.add_pincode,add_date:orderItems.add_date,add_orderItems:cartItem,add_total:orderItems.add_total,...cartItem}]
          )
        });
      })

      setCartItems([]);

      console.log(orderslist);
      alert("Ordered Successfully");
      navigate("/ays/orders")
    }
  }


  useEffect(()=>{
      cartItems.forEach((item)=>{
       let i= item.price.replace("₹ ","");
      console.log(i);
      setSum(prevsum=>{
        return prevsum+parseInt(i);
      })
        
      }
      )
      setOrderItems(previtem=>{
        return {...previtem,add_total:sum}
        }
      )
  },[cartItems])



  return (
    <div>
      <HomeNav />
      <div className="cart-header" style={{ display: "flex",flexDirection: "row",justifyContent: "space-between",width:"600px"}}>
        <div>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i
            style={{ marginRight: "20px" }}
            class="fa-solid fa-cart-shopping"
          ></i>
          Cart Items
        </h1>
        </div>
        {/* <div>
          <img src={CartAnimation} style={{marginTop:"40px",height:"100px",width:"100px"}}/>
        </div> */}
      </div>
      <hr style={{ width: "900px", height: "2px" }}></hr>


    {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>Cart is empty</h1>
        </div>
        ) : (


      <div className="cart-items">

        {cartItems.map((item,key) => {
          return (
            <div className="cart-card" key={key}>
              <CartItem
                img={item.img}
                name={item.name}
                rating={item.rating}
                size={item.size}
                price={item.price}
              />

              <button
                className="btn btn-danger"
                onClick={() => {
                  setCartItems(cartItems.filter((i,id) => id !== key));
                  setSum(0)
                  // alert("Removed from Cart!")
                }}
              >
                <i
                  style={{ marginRight: "5px" }}
                  class="fa-solid fa-cart-shopping"
                ></i>
                Remove
              </button>
            </div>
          );
        })}
      </div>

)}


    <div>
     
      <div className="cart-header" style={{ display: "flex" }}>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i
            style={{ marginRight: "20px" }}
            class="fas fa-shipping-fast"
          ></i>
          Enter Shipping Address
        </h1>
      </div>

      <hr style={{ width: "900px", height: "2px" }}></hr>
      
      <div className="cart-form">
        <div>

      
      <form onSubmit={submitHandlerCart}>
            <div className="container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    name="add_name"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="john"
                    // value={user.firstName}
                    onChange={(e)=>{
                      setNameMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{ nameMsg }</p>
                </div>
                
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Email</b>
                  </label>
                  <input
                    type="text"
                    name="add_email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="john@gmail.com"
                    // value={user.email}
                    onChange={(e)=>{
                      setEmailMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{emailMsg}</p>
                </div>
                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Phone</b>
                  </label>
                  <input
                    type="text"
                    name="add_phone"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="99******99"
                    // value={user.phone}
                    onChange={(e)=>{
                      setPhoneMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{phoneMsg}</p>
                </div>
              </div>






              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Address Line 1</b>
                  </label>
                  <input
                    type="text"
                    style={{height:"70px"}}
                    name="add_address1"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                    // value={user.email}
                    onChange={(e)=>{
                      setAddress1Msg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{address1Msg}</p>
                </div>
                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Address Line 2</b>
                  </label>
                  <input
                    type="text"
                    style={{height:"70px"}}
                    name="add_address2"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                    // value={user.phone}
                    onChange={(e)=>{
                      setPhoneMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{}</p>
                </div>
              </div>




             

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ "margin-right": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    name="add_state"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Andhra Pradesh"
                    // value={user.state}
                    onChange={(e)=>{
                      setStateMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{stateMsg}</p>
                </div>


                <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    name="add_pincode"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="500001"
                    // value={user.pincode}
                    onChange={(e)=>{
                      setPincodeMsg("");
                      handleInputs(e)
                    }}
                  />
                  <p style={{ color: "red" }}>{pincodeMsg}</p>
                </div>



                
              </div>

              <hr style={{ width: "400px", height: "2px" }}></hr>

              <div>
              <label for="exampleInputEmail1" class="form-label">
                    <h3>Total Bill</h3>
                </label>
                <p style={{ fontSize: "30px" }}>₹ {sum}</p>
              </div>

                
              <hr style={{ width: "400px", height: "2px" }}></hr>
              <div style={{ "margin-left": "10px" }} class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    <h3>Payment Mode</h3>
                  </label>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={true}
                    style={{marginRight: "10px"}}
                
                  />
                  
                  <label for="exampleInputEmail1" class="form-label
                  ">
                    <p style={{fontSize: "18px"}}>Cash On Delivery</p>
                  </label>
                 </div>
                </div>


              <button type="submit" class="btn btn-primary">
                Order Items
              </button>
            </div>
          </form>
          </div>
      </div>
    </div>
    </div>
  );
}

export default Cart;
