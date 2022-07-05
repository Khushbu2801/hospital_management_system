import React from "react";
import User from "../containers/User";
import Navbar from "./Navbar";

const Header = () => {
	return (
	<>
	  <div className={"header-container"}></div>
		<header className={"header"}>
			<Navbar />
			<div className={"welcome-container"}>
				<h1 className={"welcome-head"}>Hospital Management System</h1>
				<p className={"welcome-p"}>Stay Safe, Secure and Healthy</p>
					<div id={"book-appointment"}>
						<h4 id={"book-apt-head"}>
							<h3 className={"welcome-h3"}>Login Here!</h3>	
						</h4>
					<User />
			</div>
			</div>
		</header>
	</>
	  
	);
};
export default Header;
