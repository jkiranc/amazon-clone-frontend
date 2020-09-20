import React from 'react';
import "./CheckoutProduct.css";
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating, hideButton}) {
    const [{basket},dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',            
        })
    }
    
    return (
        <div className="checkoutProduct">
            <img className='checkoutProduct_image' src={image} />
            
            <div className='checkoutProduct_info'>
                <p className="checkoutPrduct_title">
                    {title}
                 </p>
                 <p className="checkoutProduct_price">
                     <small>$</small>
                     <strong>{price}</strong>
                 </p>

                 <div className="checkoutProduct_rating">
                 {Array(rating).fill()
                    .map((_,i) =>(
                    <p className="star_Icon"><StarRateIcon /></p>

                    ))}
                 </div>
                 {!hideButton && (
                     <button onClick={removeFromBasket}>Remove From Basket
                     </button>
                 )}
                 
            </div>
        </div>
    )
}

export default CheckoutProduct
