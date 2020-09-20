import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { authenticate, isAuth, signout } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";

function Header({ history }) {
  const [{ basket, user }, dispatch] = useStateValue();



  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input class="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!isAuth() ? "/login" : ""}>
          <div className="header_option">
            <span className="header_option_One">
              Hello {!isAuth() ? "Guest" : isAuth().name}
            </span>
            {!isAuth() ? (
              <span className="header_option_Two"><Link to="/login">Sign In</Link></span>
            ) : (
              <span
                className="header_option_Two"
                onClick={() => {
                  signout(() => {
                    toast.error("Signout Successfully");
                  });
                }}
              >
                Sign Out
              </span>
            )}
          </div>
        </Link>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_option_One">Returns</span>
            <span className="header_option_Two">Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_option_One">Your</span>
          <span className="header_option_Two">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_option_Two header_BasketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
