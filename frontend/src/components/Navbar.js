import React from "react";
//import Login from "../containers/Login"
import logo from "../assets/imgs/hms-logo8.png"
import "../assets/css/home.css"
const Navbar = () => {
	return (
		<div className={"navbar"}>
			<div className={"nav-container"}>
				<h1
					onClick={() => {
						window.location.href = "/";
					}}
					className={"nav-head"}>
					<img className={"hms-logo"} src={logo} />
					HMS
				</h1>
			</div>

		</div>
	);
};

export default Navbar;
