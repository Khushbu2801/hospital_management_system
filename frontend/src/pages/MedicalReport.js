import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate, useParams } from "react-router-dom";
import { URL } from "../components/Constant.js";
import "../assets/css/medicalreport.css";


const MedicalReport = () => {

    const token = localStorage.getItem("jwt");
    const [prescriptionId, setPrescriptionId] = useState('');
    const [details, setDetails] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const [date, setDate] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();

    useEffect(() => {
        if (token) {
            axios
                .get(`${URL}/api/hms/receptionist/getPrescription/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setPrescriptionId(response.data.id);
                    setDetails(response.data.details);
                    setAppointmentId(response.data.appointment.id);
                    setDate(response.data.appointment.date);
                    setDoctorName(response.data.appointment.doctorName);
                    setPatientName(response.data.appointment.patientName);
                    setDescription(response.data.appointment.description);
                });
        }
    }, []);

    return (
        <div>




            <div className='medical-report-container'>

                

                <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">

                    <div className="card-body">
                        <table >
                            <thead><h1 className="text-center text-primary">Medical Report</h1></thead>
                            <tbody id="tab">
                   
                        <tr key={prescriptionId}>
                        <tr><td>Prescription Id:</td><td> {prescriptionId} </td></tr>
                        <tr><td>Prescription Details:</td><td> {details} </td></tr>
                        <tr><td>Appointment Id:</td><td>{appointmentId}</td></tr>
                        <tr><td>Appointment Date:</td><td>{date}</td></tr>
                        <tr><td>Patient Name:</td><td>{patientName}</td></tr>
                        <tr><td>Doctor Name:</td><td>{doctorName}</td></tr>
                        <tr><td>Symptom Description:</td><td>{description}</td></tr>
                        <tr><td><strong>All Medical Tests are normal.</strong></td></tr>
                        </tr>
                         
                </tbody>     
                
                <tfoot>
                <button id="printPageButton" type="submit" className="btn btn-dark" onClick={() => window.print()}>Print</button>
               

                </tfoot>
                </table>
                
                

                    </div>
                </div>
                </div>
               
                
        </div>

    )
}

export default MedicalReport;