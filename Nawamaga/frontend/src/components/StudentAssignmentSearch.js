import React, { useState } from "react";
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import StudentAssignmentDetails from "../components/StudentAssignmentDetails"


const StudentAssignmentSearchBar = () => {
  const { assignment, dispatch } = useAssignmentsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
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

      {filteredAssignments.map((assignment) => (
        // Render filtered Assignment details using AssignmentDetails component
        <StudentAssignmentDetails key={assignment._id} assignment={assignment} />
      ))}
      {filteredAssignments.length === 0 && <p>No Assignment found.</p>}
    </div>
  );
};

export default StudentAssignmentSearchBar;