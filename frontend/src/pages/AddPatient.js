import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AdminNavbar from '../components/AdminNavbar';
import '../assets/css/addBook.css';
import { URL } from "../components/Constant.js";
const AddPatient = () => {

    //token
    const token = localStorage.getItem("jwt");
	
	//Fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [mobile_no, setMobileNumber] = useState('');
    const [address,setAddress] = useState('');
    const [gender,setGender] = useState('');
    const [disease,setDisease] = useState('');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const  genderType = [
        {
            value: 'MALE',
            label: 'Male',
        },
        {
            value: 'FEMALE',
            label: 'Female',
        }];

    const textInput = useRef(null);
   

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
        e.preventDefault();
        // const id = patients.length + 1;



        if (!name || !email || !age || !mobile_no|| !address || !gender || !disease) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
            
        }
        else if(age<=0){
            return Swal.fire({
                icon:'info',
                title:'Error!',
                text:'Enter your age',
                showCloseButton:true

            })
        }
        else if(mobile_no.length<10){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid mobile number.',
                showCloseButton:true
            })
        }
        else if(mobile_no.length>10){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid mobile number.',
                showCloseButton:true
            })
        }
        else if(!regex.test(email)){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter valid email address.',
                showCloseButton:true
            })
        }
        else if(name.length<3){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Name must contain more than 2 characters.',
                showCloseButton:true
            })
        }
        const newPatient = {
            name,
            email,
            age,
            mobile_no,
            address,
            gender,
            disease
            
        }
        axios.post(`${URL}/api/hms/receptionist/patient`,newPatient,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
           
            
        })
        .then((response) => {
            console.log(response.data);
          })
        .catch((error) =>{
            console.log(error);
        });
       

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${name}'s data has been Added.`,
            showConfirmButton: false,
            timer: 2000
        });
        window.location.href="/viewPatients"
    }


    return (
      <>
      
        <AdminNavbar/>
        
        <div className="small-container">
    
            <form onSubmit={handleAdd}>
                <h1 className='receptionistHeader'>Add Patient</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    className='inputFields'
                    ref={textInput}
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    className='inputFields'
                    name="age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className='inputFields'
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="mobile_no">Mobile Number</label>
                <input
                    id="mobile_no"
                    type="number"
                    className='inputFields'
                    name="mobile_no"
                    value={mobile_no}
                    onChange={e => setMobileNumber(e.target.value)}
                />

                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    className='inputFields'
                    type="text"
                    name="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />

                <label htmlFor="disease">Disease</label>
                <input
                    id="disease"
                    type="text"
                    className='inputFields'
                    name="disease"
                    value={disease}
                    onChange={e => setDisease(e.target.value)}
                />
                <label htmlFor="gender">Gender</label>
                <TextField
								id="demo-simple-select-autowidth"
								select
								label="Select"
								//defaultValue={{ label: "Select..", value: 0 }}
								name="gender"
								className={'inputFields'}
								placeholder="Gender"
								value={gender}
								onChange={e=> setGender(e.target.value)}
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
                {/* <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={e=> setGender(e.target.value)}>
                    <option value="Select">Select..</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select> */}
                
                <div style={{ marginTop: '30px' }}>
                    <Button variant="primary" size="lg"  style={{ marginBottom:'20px'}} type="submit" className={'addPatientButton'} value="Add Patient" onClick={handleAdd} >Add Patient</Button>
                  
                    <Button variant="danger" size="lg"
                        style={{ marginLeft: '12px' ,marginBottom:'20px'}}
                        className="muted-button"
                        type="button" onClick={() => {
                          window.location.href = "/receptionistDashboard";
                            }}>Cancel</Button>
                </div>
            </form>
            </div>
            
 
 
        </>
    );
}

export default AddPatient