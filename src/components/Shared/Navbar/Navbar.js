import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://powerful-brushlands-39960.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email: loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => setIsAdmin(data))
    }, [loggedInUser.email])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="#" className="navbar-brand">
                    <img src={logo} className="img-fluid" alt="logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" style={{marginTop: loggedInUser.email ? '1.3rem': ''}}>
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to="#" className="nav-link me-5">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link me-5">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link me-5">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link me-5">Contact</Link>
                        </li>
                        {isAdmin && 
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link me-5">Admin</Link>
                            </li>
                        }
                        <li className="nav-item">
                            {
                                loggedInUser.email ? <p className="nav-link user-name">{loggedInUser.name == null ? loggedInUser.email : loggedInUser.name}</p> : 
                                <Link to="/login">
                                    <button className="btn btn-style px-4">Login</button>
                                </Link> 
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;