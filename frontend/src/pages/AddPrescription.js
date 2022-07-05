import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import  Button from 'react-bootstrap/Button';
import Container from '@material-ui/core/Container';
import '../assets/css/prescription.css';
import AdminNavbar from "../components/AdminNavbar";
import { URL } from "../components/Constant.js";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';


const AddPrescription = () => {

  const [details,setDetails] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const prescription = {details};
  
    console.log(prescription)
    console.log(token);    
      axios
        .post(`${URL}/api/hms/doctor/addPrescription/${id}`, prescription, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/viewPrescription");
        })
        .catch((error) => {
          console.log(error);
        });
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `Prescription has been added successfully.`,
          showConfirmButton: false,
          timer: 1500
      });
  }
  return (
    <>
    <AdminNavbar/>
    <Container maxWidth="md" className="prescription-container" >
        <form >
        <h1>Add prescription</h1>
        <Form.Label htmlFor="description">Enter Prescription</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  className="tarea"
                  placeholder="Enter Prescription"
                  id="description"
                  name="description"
                  value={details} 
                  onChange={e => setDetails(e.target.value)}
                  
                ></Form.Control>
        <div className="prescriptionSubmit">
            <Button variant="success" size="md" className="prescriptionSubmit"  onClick={(e)=>handleSubmit(e)} >Submit</Button>
            <Link to="/viewPrescription" style={{marginLeft:"2rem", marginTop:"10px"}} className="btn btn-primary btn-md  mb-2">
            Go Back
            </Link>       
          </div>
        </form>

    </Container>
    </>
  );
};

export default AddPrescription;