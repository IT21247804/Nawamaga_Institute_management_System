import React, { useState } from "react";
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import AssignmentDetails from "../components/assignmentDetails"
import jsPDF from "jspdf";

const AssignmentSearchBar = () => {
  const { assignment, dispatch } = useAssignmentsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    assignment.forEach((assignment, index) => {
      const y = 10 + index * 40;
      doc.text(`Name: ${assignment.topic}`, 10, y);
      doc.text(`Topic/Reason: ${assignment.number}`, 10, y + 10);
      doc.text(`Description: ${assignment.description}`, 10, y + 20);
      doc.text(`Description: ${assignment.date}`, 10, y + 20);

    });

    // Save the PDF as a file
    doc.save("assignment.pdf");
  };

  // Add null check before calling filter
  const filteredAssignments = assignment
    ? assignment.filter((assignment) =>
        assignment.topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={clearSearch}>Clear</button>
      <br></br>
      <br></br>
      <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF</button>
      {filteredAssignments.map((assignment) => (
        // Render filtered Assignment details using AssignmentDetails component
        <AssignmentDetails key={assignment._id} assignment={assignment} />
      ))}
      {filteredAssignments.length === 0 && <p>No Assignment found.</p>}
    </div>
  );
};

export default AssignmentSearchBar;