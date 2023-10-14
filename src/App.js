import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import axios from "axios";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route,Routes, Switch } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from './component/Product/Products';
import Search from "./component/Product/Search"
import LoginSignup from './component/User/LoginSignup';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from './component/Cart/OrderSuccess';
import NotFound from "./component/layout/NotFound/NotFound";
import MyOrders from "./component/Order/MyOrders";


function App() {

const { isAuthenticated,user } = useSelector((state) => state.user)


const [stripepromise, setstripepromise] = useState("pk_test_51O0IHESFqhncoIElrksnz5rezRwkBnvT64RLd6GjWB0uQ6HfmxgrMTufRfAGqqb5b4BpPFQRl6JwHhaskqENkEaA0054PWOrS4")

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/api/v1/stripeapikey");

    setstripepromise(data.stripeApiKey);
    console.log(data.stripeApiKey);
 }



useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
    getStripeApiKey();
   
  }, []);

  return (
    <Router>
      <Header/>
     {isAuthenticated && <UserOptions user={user} />}
      {stripepromise && (
        <Elements stripe={loadStripe(stripepromise)}>
           <Routes><Route exact path='/process/payment' element={<ProtectedRoute component={Payment} />} /></Routes>
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignup/>}/>

       <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />

        <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />

        <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} /> 
       

        <Route exact path='/password/forgot' element={<ForgotPassword/>} />

        <Route exact path="/Cart" element={<Cart/>}/>

        <Route exact path='/shipping' element={<ProtectedRoute component={Shipping} />} /> 

        <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />} />

        <Route exact path='/order' element={<ProtectedRoute component={MyOrders} />} />

        <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess} />} />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

        
    </Routes>
     
        
      <Footer/>
    </Router>
  );
}

export default App;
