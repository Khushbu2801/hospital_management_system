import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Paper, Button, useIsFocusVisible } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import logo from "../assets/imgs/Doctor_20.png";
import "../assets/css/form.css";
import "../assets/css/main.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import {URL} from '../components/Constant';
import axios from 'axios';
const genderType = [
	{
		value: 'MALE',
		label: 'Male',
	},
	{
		value: 'FEMALE',
		label: 'Female',
	}];

const Signup = () => {
	const paperStyle = {
		padding: '60px 100px',
		width: 550,
		margin: "20px auto"
	};
	const initialValues = { name: "", email: "", password: "", qualification: "", specialist: "", mobile_no: "", gender: "", age: "" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const errors = {};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post(`${URL}/doctor/registration`, {
			name: formValues.name,
			email: formValues.email,
			password: formValues.password,
			qualification: formValues.qualification,
			specialist: formValues.specialist,
			mobile_no: formValues.mobile_no,
			gender: formValues.gender,
			age: formValues.age,

			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formValues)

		})
			.then((response) => {
				console.log(response.data);
				//navigate("/doctorDashboard", { replace: true });
				window.location.href = "/login"
			});
		setFormErrors(validate(formValues));
		setIsSubmit(true);
		if (errors.length === 0) {
			return window.location.href = "/login";
		}
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors]);
	const validate = (values) => {

		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.name || !values.email || !values.password || !values.qualification || !values.specialist || !values.mobile_no || !values.gender || !values.age) {
			return Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: 'All fields are required.',
				showConfirmButton: true
			});
		}
		else if(values.name.length < 3){
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Name must contain more than 2 characters.',
                showConfirmButton:true
            })
		}
		else if (values.mobile_no.length < 10) {
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid mobile number.',
                showConfirmButton:true
            })
		}
		else if (values.mobile_no.length > 10) {
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid mobile number.',
                showConfirmButton:true
            })
		}
		else if (!regex.test(values.email)) {
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid email address.',
                showConfirmButton:true
            })
		}
		else if (values.password.length < 5) {
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Password must contain more than 4 characters.',
                showConfirmButton:true
            })
		}
		else if (values.password.length > 18) {
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Password must not exceed 18 characters.',
                showConfirmButton:true
            })
		}
		else if(values.age < 0 ){
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Age must be greater than 0.',
                showConfirmButton:true
            })
		}
		else if(values.qualification.length <2  ){
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Qualification must contain atleast 2 characters.',
                showConfirmButton:true
            })
		}
		else if(values.specialist.length < 2 ){
			return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Specialization must contain atleast 2 characters.',
                showConfirmButton:true
            })
		}
		


		else {
			Swal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'Registration Successful',
			});
			window.location.href = "/login";
		}
		return errors;
	};


	return (
		<React.Fragment>
			<div id={"super-container"}>
				<Navbar />
				<div className={"parent-container"} >
					<Paper elevation={3} style={paperStyle} >
						<h1 style={{ color: "purple", textAlign: "center" }}>Registration</h1>
						<img src={logo} alt={"Health Insurance"} style={{ justifyContent: "center", alignItems: "center" }} />
						<form noValidate autoComplete="off" onSubmit={handleSubmit}>


							
							<label>Name</label>
							<input id="outlined-basic" label="Name" variant="outlined" fullWidth

								type="text"
								name="name"
								className={'inputFields'}
								placeholder="Name"
								defaultValue={formValues.name}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.name}</p>
							
							<label>Qualification</label>
							<input id="outlined-basic" label="Qualification" variant="outlined" fullWidth
								type="text"
								name="qualification"
								className={'inputFields'}
								placeholder="Qualification"
								defaultValue={formValues.qualification}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.qualification}</p>
							
							<label>Specialist</label>
							<input id="outlined-basic" label="Specialist" variant="outlined" fullWidth
								type="text"
								name="specialist"
								className={'inputFields'}
								placeholder="Specialist"
								defaultValue={formValues.specialist}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.specialist}</p>
							
							<label>Mobile Number</label>
							<input id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth
								type="number"
								name="mobile_no"
								className={'inputFields'}
								placeholder="Mobile Number"
								defaultValue={formValues.mobile_no}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.mobile_no}</p>
							
							<label>Email</label>
							<input id="outlined-basic" label="Email" variant="outlined" fullWidth
								type="text"
								name="email"
								className={'inputFields'}
								placeholder="Email"
								defaultValue={formValues.email}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.email}</p>
							
							<label>Password</label>
							<input id="outlined-basic" label="Password" variant="outlined" fullWidth
								type="password"
								name="password"
								className={'inputFields'}
								placeholder="Password"
								defaultValue={formValues.password}
								onChange={handleChange} required />
							<p className='errorMessage'>{formErrors.password}</p>
							
							<TextField
								id="demo-simple-select-autowidth"
								select
								label="Select"
								//defaultValue={{ label: "Select..", value: 0 }}
								name="gender"
								className={'inputFields'}
								placeholder="Gender"
								defaultValue={formValues.gender}
								onChange={handleChange}
								helperText="Please select your Gender"
								fullWidth
								variant="outlined"
							>
								{genderType.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<p className='errorMessage'>{formErrors.gender}</p>

							<label>Age</label>
							<input id="outlined-basic" label="Age" variant="outlined"
								type="number"
								name="age"
								className={'inputFields'}
								placeholder="Age"
								defaultValue={formValues.age}
								onChange={handleChange} required fullWidth />
							<p className='errorMessage'>{formErrors.age}</p>
							<Grid container spacing={2}>
								<Grid item xs={7}>
									<Button
										variant="contained"
										color="primary"
										size="large"
										onClick={handleSubmit}> Submit </Button>
								</Grid>
								<Grid item xs={5}>
									<Button
										variant="contained"
										color="secondary"
										size="large"
										onClick={() => { window.location.href = "/login"; }}
									> Cancel</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>
			</div>
			<Footer />
		</React.Fragment>

	);
}
export default Signup;