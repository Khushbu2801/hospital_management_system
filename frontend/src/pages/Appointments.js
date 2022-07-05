import React,{useState, useEffect} from 'react';
import AdminNavbar from '../components/AdminNavbar';
import {Link } from "react-router-dom";
import '../assets/css/appointments.css';
import axios from 'axios';
import {URL} from '../components/Constant.js';
function Appointments() {

    const[appointment,setAppointment] = useState([]);
    
    

    //token
    const token = localStorage.getItem("jwt");




    useEffect(()=>{
        if (token) {
    axios.get(`${URL}/api/hms/doctor/appointment`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
            setAppointment(response.data);
    });}
},[]);
   // console.log(data);

    const getAppointments = () => {
        axios
          .get(`${URL}/api/hms/doctor/appointment`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {       
            console.log(response.data);  
            setAppointment(response.data);     
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    return (
        <>
        <AdminNavbar/>
        <div className='contain-table'>
            <h1>Appointments</h1>
            <Link to="/doctorDashboard" style={{marginLeft:"70rem"}} className="btn btn-primary btn-md  mb-2">
                Go Back
            </Link>   
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Appointment Id</th>
                        <th>Date</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                        <th>Description</th>
                    </tr>     
                </thead>
                <tbody>
                    {appointment.map((appointments)=>(
                        <tr key={appointments.id}>
                        <td> {appointments.id} </td>
                        <td> {appointments.date} </td>
                        <td>{appointments.doctorName}</td>
                        <td>{appointments.patientName}</td>
                        <td>{appointments.description}</td>
                        </tr>
        
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Appointments