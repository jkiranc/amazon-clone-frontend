import React, {useState, useEffect} from 'react';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
import axios from 'axios';
import { isAuth, getCookie} from "./helpers/auth";
import {Redirect, Link} from 'react-router-dom'


function Orders() {
    const [{basket,user, token}, dispatch] = useStateValue();
    const [orders, setOrders] = useState();

    useEffect(() => {
        try {
            axios
            .get(`${process.env.REACT_APP_API_URL}/user/order/${isAuth()._id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(res => {
              console.log("resdata", res.data)
              setOrders(res.data)
            })
            .catch(err => {
              alert("im error")
            });
        } catch (error) {
            console.log("user not found")
        }
    }, [])
    useEffect(()=>{

    },[token])

    return (
        <div className="orders">

            
            {isAuth() ?  (
            <><h1>Your Orders</h1>

            <div className='orders_order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
            </>) : <Link to="/login">Login in to see your cart</Link>}
        </div>
    )
}

export default Orders
