import React, { useState } from "react";
import { useClassfeesContext } from "../hooks/useClassfeeContext";
import StudentclassfeeDetail from "./StudentClassfeeDetail";
import jsPDF from "jspdf";


const StudentclassfeeSearchbar = () => {
  const { classfees, dispatch } = useClassfeesContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Add null check before calling filter
  const filteredClassfees = classfees
    ? classfees.filter((classfee) =>
        classfee.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

    const exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "ClassFee Report";
     
      const headers = [[ "Stu NO", "Subject", "Class Type", "Email"]];
  
      const data = classfees.map(classfees => [ classfees.studentno, classfees.subject, classfees.classtype, classfees.email]);
  
      let content = {
          startY: 50,
          head: headers,
          body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("classFeereport.pdf")
  }

  return (
    <div>
      <input id="serchb"
        type="text"
        placeholder="Search by subject"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="searchbtn" id="serchbtn" onClick={clearSearch}>
        Clear
      </button>
      <span></span>

      <button className="pdfbtn" id="serchbtn" onClick={exportPDF}>
        Generate PDF
      </button>
      <table id ="t1">
      <thead>
    <tr>
      <th id="tth1"> student No</th>
      <th id="tth2">Subject</th>
      <th id="tth3">Class Type</th>
      <th id="tth5">Email</th>

      
    </tr>
  </thead>


  
      </table>
      
        
          {filteredClassfees.map((classfee) => (
            // Render filtered classfee details using ClassfeeDetails component
            <StudentclassfeeDetail key={classfee._id} classfee={classfee} />
          ))}
        

      {filteredClassfees.length === 0 && <p>No classfee found.</p>}

    </div>
  );
};

export default StudentclassfeeSearchbar;