import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

import Login from "./containers/Login";
import HomePage from "./components/Home";
import Signup from "./containers/Signup";
import AddPatient from "./pages/AddPatient";
import ReceptionistLogin from "./containers/ReceptionistLogin";
import ReceptionistDashboard from "./containers/ReceptionistDashboard";
import DoctorDashboard from "./containers/DoctorDashboard";
import ViewPrescription from "./pages/ViewPrescription";
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import ViewPatients from './pages/ViewPatient';
import UpdatePatients from './pages/UpdatePatient';
import AddPrescription from "./pages/AddPrescription";
import MedicalReport from "./pages/MedicalReport";
import ViewMedicalReport from "./pages/ViewMedicalReport";



const App = () => {

	return (
			<Router>
				<div>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/login"element={<Login />}/>
						<Route path="/signup"element={<Signup />}/>
						<Route path="/doctorDashboard"element={<DoctorDashboard />}/>
						<Route path="/receptionistLogin"element={<ReceptionistLogin/>}/>
						<Route path="/addPatients"element={<AddPatient/>}/>
						<Route path="/receptionistDashboard" element={<ReceptionistDashboard />}/>
						<Route path="/addPrescription/:id" element={<AddPrescription />}/>
						<Route path="/viewPrescription" element={<ViewPrescription/>}/>
						<Route path="/bookAppointment" element={<BookAppointment />}/>
						<Route path="/appointments" element={<Appointments/>}/>
						<Route path="/viewPatients" element={<ViewPatients/>}/>
						<Route path="/updatePatients/:id" element={<UpdatePatients/>}/>
						<Route path="/medicalreport/:id" element={<MedicalReport/>}/>
						<Route path="/viewmedicalreport" element={<ViewMedicalReport/>}/>

			
					</Routes>
				</div>
			</Router>
	);
};

export default App;
