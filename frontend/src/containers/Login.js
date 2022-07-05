import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Navbar from "../components/Navbar";
import logo from "../assets/imgs/Doctor_20.png";
import "../assets/css/form.css";
import "../assets/css/main.css";
import { URL } from "../components/Constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedin } from "../context/LoginContext";


const errors = {};

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(2),


		},
	},
}));

const Login = () => {
	const classes = useStyles();
	const { isLoggedIn } = useSelector((state) => state.login);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [msg, setMsg] = useState(false);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/login", { replace: true });
		}
		// eslint-disable-next-line
	}, []);
	const paperStyle = {
		padding: '50px 50px',
		width: 400,
		margin: "40px auto",
		color: green

	};

	const signup = () => {
		navigate("/signup", { replace: true });
	}
	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "email") {
			if (value === "" || value.length < 5) {
				errors.email = "Username is required";
			} else {
				delete errors.email;
			}
		}

		if (name === "password") {
			if (value === "" || value.length < 5) {
				errors.password = "Password is required";
			} else {
				delete errors.password;
			}
		}

		if (Object.keys(errors).length !== 0) {
			setFormErrors(errors);
		} else {
			setFormErrors({});
		}
		setUser({ ...user, [name]: value });
	};
	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post(`${URL}/authenticate`, {
				email: user.email,
				password: user.password,
			})
			.then((response) => {
				console.log(response.data);
				localStorage.setItem("jwt", response.data.jwt);
				dispatch(userLoggedin());
				navigate("/doctorDashboard", { replace: true });
			}, e => setMsg(true));
	};



	return (
		<React.Fragment>
			<div id={"super-container"}>
				<Navbar />
				<div className={"parent-container"}>
					<Paper elevation={3} style={paperStyle}>
						<h1 style={{ color: "", textAlign: "center" }}>Login</h1>
						<div className="logincontainer">
							<img src={logo} alt={"Health Insurance"} />
						</div>
						<form onSubmit={handleLogin}>
							<div className="mb-3">
								<label htmlFor="Email" className="form-label">
									Email Id
								</label>
								<input
									type="text"
									className="form-control"
									id="email"
									name="email"
									placeholder="Enter your Email"
									value={user.email}
									onChange={handleChange}
								/>
								{formErrors && (
									<span className="text-danger">{formErrors.email}</span>
								)}
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Enter your Password"
									name="password"
									value={user.password}
									onChange={handleChange}
								/>
								{formErrors && (
									<span className="text-danger">{formErrors.password}</span>
								)}
							</div>
							<div className="text-center">
								{msg && <p className="text-danger" style={{ textAlign: 'center' }}>
									Invalid Credentials!</p>}
								<button
									type="submit"
									className="btn btn-primary"
									disabled={Object.keys(formErrors).length !== 0}
								>
									Submit
								</button>
							</div>
							<div>
								<p className="text-success" style={{ textAlign: 'center' }}>
									You don't Have an Account!</p>
								<button
									type="submit"
									className="btn btn-success"
									onClick={signup}

								>
									Create Account
								</button>
							</div>
						</form>

					</Paper>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Login;
