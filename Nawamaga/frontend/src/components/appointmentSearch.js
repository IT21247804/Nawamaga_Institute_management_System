import React, { useState } from "react";
import jsPDF from "jspdf";
import { useAppointmentsContext } from "../hooks/useappointmentsContext";
import AppointmentsDetails from "./appointmentDetails";

const AppointmentsSearchBar = () => {
  const { appointments, dispatch } = useAppointmentsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

 
    const exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "Appointment Report";
     
      const headers = [[ "Name", "teacher Name", "Date"]];
  
      const data = appointments.map(appointment => [ appointment.name, appointment.tname, appointment.date]);
  
      let content = {
          startY: 50,
          head: headers,
          body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("appointment report.pdf")
  }

  // Add null check before calling filter
  const filteredAppointments = appointments
    ? appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn btn-primary" onClick={clearSearch}>Clear</button>
      &nbsp;&nbsp;
      <button className="btn btn-primary" onClick={exportPDF}>Generate PDF</button>
      {filteredAppointments.map((appointment) => (
        // Render filtered appointments details using AppointmentsDetails component
        <AppointmentsDetails
          key={appointment._id}
          appointment={appointment}
        />
      ))}
      {filteredAppointments.length === 0 && <p>No appointments found.</p>}
    </div>
  );
};

export default AppointmentsSearchBar;