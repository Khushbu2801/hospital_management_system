import React, { useState, useRef, useEffect,useNavigate } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "../assets/css/addBook.css";
import AdminNavbar from '../components/AdminNavbar';
import Swal from 'sweetalert2';
import { URL } from "../components/Constant";
import axios from 'axios';


const BookAppointment =({ state, changeState })=> {
  const initialValues = { doctorName: "", patientName: "", date: "", description: ""};
    //const URL="http://localhost:8080";
    const token = localStorage.getItem("jwt");
    const [appointment,setAppointment]=useState(initialValues)
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    
    const textInput = useRef(null);
   

    useEffect(() => {
        //textInput.current.focus();
    }, [])

    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setAppointment
    //   ({ ...appointment, [name]: value });
    // };

    const handleSubmit = e => {
        e.preventDefault();
        if (!doctorName || !patientName|| !date || !description) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
            
        }
        const bookAppointment ={
            doctorName,
            patientName,
            date,
            description
        }

        axios.post(`${URL}/api/hms/receptionist/addAppointment`,bookAppointment,{
          
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
            text: `${patientName}'s appointment has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
        window.location.href="/receptionistDashboard"
    }

   return (
       
      <div className='bookAppointment'>
           <AdminNavbar />
        <div className="small-container">
            <form onSubmit={handleSubmit}>
                <h1 className={'receptionistHeader'}>Book Appointment</h1>        
                <Form.Label htmlFor="doctorName">Doctor Name</Form.Label>
                <input
                    id="doctorName"
                    type="text"
                    name="doctorName"
                    value={doctorName}
                    onChange={e => setDoctorName(e.target.value)}
                    />

                <label htmlFor="patientName">Patient Name</label>
                <input
                    id="patientName"
                    type="text"
                    name="patientName"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  className="tarea"
                  placeholder="Enter text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  
                ></Form.Control>


             
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <Button variant="primary" type="submit"
                     >Book Appointment
                        </Button>
                    <Button variant="danger" 
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button" onClick={() => {
                          window.location.href = "/receptionistDashboard";
                            }}>Cancel</Button>
                </div>
            </form>
        </div>
      </div>
    );
}

export default BookAppointment;