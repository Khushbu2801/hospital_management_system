import React from "react";
import "../assets/css/dashboard.css";
import UserNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/css/doctor.css";
import Box from '@mui/material/Box';
import logo from "../assets/imgs/medical-appointment.png";
import logo2 from "../assets/imgs/medicalReport3.png";
// import PatientContextProvider from './contexts/PatientContext';




function DoctorDashboard() {
    return(
        <>
        
        <div className="doctorContainer">
        <div className="doctorDashboard">
        <div><UserNavbar /></div>
            <div className="doctor">
                <h1 className="doctorTitle">Doctor Dashboard</h1>
                <Container >
                    <Row>
                        <Col className={'docCol'}>

                        <Box
                             sx={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 '& > :not(style)': {
                                  m: 1,
                                  width: 260,
                                  height: 320,
                                },
                            }}

                        >
                            
                            <Button className="doctorButton" variant="secondary" 
                                    onClick={() => {
						            window.location.href = "/appointments";
					                }}>
                                 <img class="recLogo" src={logo} alt={"Appointments"} />
                                <h5 className="buttonText">
                                        Appointments
                                </h5>
                            </Button>
                        </Box>
                            
                            
                        </Col>
                        <Col>
                        <Box
                             sx={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 '& > :not(style)': {
                                  m: 1,
                                  width: 260,
                                  height: 320,
                                },
                            }}
                        >
                            <Button className="doctorButton" variant="secondary" 
                                     onClick={() => {
                                     window.location.href = "/viewPrescription";
                                    
                                     }}>
                                <img class="recLogo" src={logo2} alt={"Add Prescription"} />
                                <h5 className="buttonText">
                                    Add Prescription
                                </h5>
                            </Button>
                        </Box>
                            
                        </Col>
                        
                    </Row>
                </Container>
            </div>
            <Footer/>
        </div>
        </div>
        
        </>
    );

}

export default DoctorDashboard;