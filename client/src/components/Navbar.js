import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
return ( <div className="navbar"> <img src={logo} alt="logo" className="logo" /> <h1>🎓 Student Performance Predictor</h1> </div>
);
};

export default Navbar;
