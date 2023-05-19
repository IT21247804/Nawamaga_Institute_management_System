import React, { useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useSalaryContext } from "../hooks/useSalaryContext";
import SalaryDetails from "./SalaryDetails";
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';

const SearchBar = () => {
  const { salaries,dispatch} = useSalaryContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => { 
    setSearchTerm("");
  };
  /*const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    salaries.forEach((salary, index) => {
      const y = 10 + index * 40;
      doc.text(`FullName    : ${salary.FullName}`, 10, y);
      doc.text(`Email       : ${salary.Email}`, 10, y + 10);
      doc.text(`NetSalary   : ${salary.NetSalary}`, 10, y + 20);
    });

    // Save the PDF as a file
    doc.save("salary.pdf");
  };*/

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Salary Report";
   
    const headers = [[ "Name", "Email", "Salary (Rs)", "Net Salary (Rs)", "Date"]];

    const data = salaries.map(salary => [ salary.FullName, salary.Email, salary.Sal, salary.NetSalary, salary.date]);

    let content = {
        startY: 50,
        head: headers,
        body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

  


  // Add null check before calling filter
  const filteredsalary = salaries
    ? salaries.filter((salary) =>
        salary.FullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  return (
    <div>
      <input
        type="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        
      />
      
      <button  type="button" className="btn btn-primary d-letter-spacing" onClick={clearSearch} >Clear</button>
      
      <br></br>
      <br></br>
      
      <div className='col' style={{ paddingTop: "15px", paddingLeft: "566px" }}>
                                    <button type="button" className="btn btn-success d-letter-spacing" style={{ backgroundColor: "red" }}  onClick={exportPDF}>Get Report</button>
                                </div>

           
           <br></br>    
           <MDBTable borderless className='mt-3' >
           <MDBTableHead>
    <tr className="bg-dark">
      <th id="tth1">Full Name</th>
      <th id="tth2">Email</th>
      <th id="tth3">NetSalary</th>
      <th id="tth4">Date</th>

      <th id="tth6">Actions</th>
    </tr>
    </MDBTableHead>
     </MDBTable>
      
      
   
      {filteredsalary.map((salary) => (
       
        <SalaryDetails key={salary._id} salary={salary} />
      ))}
      {filteredsalary.length === 0 && <p>No salary found</p>}
    </div>
  );
};

export default SearchBar;