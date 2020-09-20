import React from 'react';
import './Product.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import {useStateValue} from "./StateProvider";

function Product({title,image,price,rating}) {
    const [{basket}, dispatch] = useStateValue();
    console.log('this is the basket >>>',basket);
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };
    return (
        <div className="product">
            <div classNam="product_Info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_Rating">
                    {Array(rating).fill()
                    .map((_,i) =>(
                    <p className="star_Icon"><StarRateIcon /></p>

                    ))}
                </div>
            </div>
            
            <img src={image} />

            <button onClick={addToBasket}>Add to basket</button>
</div>
    )
}

export default Product
