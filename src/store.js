import {legacy_createStore as createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productsReducer, productDetailsReducer,newReviewReducer } from "./reducers/productReducer";
import {forgotPasswordReducer, updateProfileReducer, userReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
        allOrdersReducer,
        myOrdersReducer,
        newOrderReducer,
        orderDetailsReducer,
        orderReducer,
      } from "./reducers/orderReducer";

const reducer = combineReducers({
        products : productsReducer,
        productDetails : productDetailsReducer,
        user : userReducer,
        profile : updateProfileReducer,
        forgotPassword : forgotPasswordReducer,
        cart : cartReducer,
        allOrders: allOrdersReducer,
        myOrders: myOrdersReducer,
        newOrder: newOrderReducer,
        orderDetails: orderDetailsReducer,
        order: orderReducer,
        newReview: newReviewReducer,
})

let initialState = {
        cart : {
                cartItems : localStorage.getItem("cartItems")
                ?
                JSON.parse(localStorage.getItem("cartItems"))
                :[],

                shippingInfo : localStorage.getItem("shippingInfo")
                ?
                JSON.parse(localStorage.getItem("shippingInfo"))
                :{}

        }
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
