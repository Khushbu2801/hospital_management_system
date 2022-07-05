import React,{useState, useEffect} from 'react';
import { Link} from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar';
import '../assets/css/appointments.css';
import axios from 'axios';
import {URL} from '../components/Constant.js';
function ViewMedicalReport() {

    const[report,setReport] = useState([]);
    

    //token
    const token = localStorage.getItem("jwt");




    useEffect(()=>{
        if (token) {
    axios.get(`${URL}/api/hms/receptionist/viewPrescription`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
            setReport(response.data);
    });}
},[]);
   // console.log(data);

    const getReport = () => {
        axios
          .get(`${URL}/api/hms/receptionist/viewPrescription`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {       
            console.log(response.data);  
            setReport(response.data);     
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    return (
        <>
        <AdminNavbar/>
        <div className='contain-table'>
            <h1>Medical Reports</h1>
            <Link to="/receptionistDashboard" style={{marginLeft:"70rem"}} className="btn btn-primary btn-md  mb-2">
          Go Back
        </Link>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Prescription Id</th>
                        <th>Details</th>
                        <th>Appointment Id</th>
                        <th>Date</th>
                        <th>Patient's Name</th>
                        <th>Doctor's Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>     
                </thead>
                <tbody>
                    {report.map((reports)=>(
                        <tr key={reports.id}>
                        <td> {reports.id} </td>
                        <td> {reports.details} </td>
                        <td>{reports.appointment.id}</td>
                        <td>{reports.appointment.date}</td>
                        <td>{reports.appointment.patientName}</td>
                        <td>{reports.appointment.doctorName}</td>
                        <td>{reports.appointment.description}</td>
                        <td><button className="btn btn-info" onClick={() => {window.location.href=`/medicalreport/${reports.id}`}}>Generate Medical Report</button></td>

                        </tr>

        
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default ViewMedicalReport