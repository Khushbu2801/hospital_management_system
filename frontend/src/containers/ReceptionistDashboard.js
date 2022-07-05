import React from "react";
import "../assets/css/dashboard.css";
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/css/receptionist.css";
import Box from '@mui/material/Box';
import logo from "../assets/imgs/add-group.png";
import logo2 from "../assets/imgs/appointment 2.png";
import logo3 from "../assets/imgs/medicalReport3.png";
import logo4 from "../assets/imgs/medicalReport1.png"



function ReceptionistDashboard() {
    return(
        <>
        
        <div className="receptionistContainer">
        <div className="receptionistDashboard">
        <div><AdminNavbar /></div>
            <div className="receptionist">
                <h1 className="receptionistTitle">Receptionist Dashboard</h1>
                <Container >
                    <Row>
                        <Col>

                        <Box
                             sx={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 '& > :not(style)': {
                                  m: 1,
                                  width: 240,
                                  height: 300,
                                },
                            }}

                        >
                            
                            <Button className="receptionistButton" variant="secondary" 
                                    onClick={() => {
						            window.location.href = "/addPatients";
					                }}>
                                 <img class="recLogo" src={logo} alt={"Add Patients"} />
                                <h5 className="buttonText">
                                        Add Patient
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
                                  width: 240,
                                  height: 300,
                                },
                            }}
                        >
                            <Button className="receptionistButton "variant="secondary"  
                                    onClick={() => {
						            window.location.href = "/viewPatients";
					                }}>
                                <img class="recLogo" src={logo4} alt={"View Patients"} />
                                <h5 className="buttonText">
                                    View Patients
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
                                  width: 240,
                                  height: 300,
                                },
                            }}
                        >
                            <Button className="receptionistButton" variant="secondary" 
                                     onClick={() => {
                                     window.location.href = "/bookAppointment";
                                     }}>
                                <img class="recLogo" src={logo2} alt={"Book Appointment"} />
                                <h5 className="buttonText">
                                    Book Appointment
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
                                  width: 240,
                                  height: 300,
                                },
                            }}
                        >
                            <Button className="receptionistButton "variant="secondary"  
                                    onClick={() => {
						            window.location.href = "/viewmedicalreport";
					                }}>
                                <img class="recLogo" src={logo3} alt={"Medical Report"} />
                                <h5 className="buttonText">
                                    Medical Report
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

export default ReceptionistDashboard;