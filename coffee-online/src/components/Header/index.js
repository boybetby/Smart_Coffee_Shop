import React from 'react'
import './style.scss'
import { Link } from "react-router-dom";
import Logo from './../../assets/logo.png'


const Header = () => {
    return (
        <div className="nav_coffee">      
                <Link to="/" style={{"display": "block", "width": "200px"}}>
                    <div style={{backgroundImage: `url(${Logo})`}} className="logo"></div>
                </Link>         
        </div>
    )
}

export default Header
