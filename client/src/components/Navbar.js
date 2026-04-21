    import React from "react";
    import logo from "../assets/logo.png";

    const Navbar = () => {
    return ( <div className="navbar"> <div className="nav-left"> <img src={logo} alt="GradeX Logo" className="logo" /> </div>

    
    <div className="nav-center">
        <h1>🎓 Student Performance Predictor</h1>
    </div>
    </div>


    );
    };

    export default Navbar;
