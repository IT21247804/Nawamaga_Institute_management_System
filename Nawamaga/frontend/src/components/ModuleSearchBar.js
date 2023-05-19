import React, { useState } from "react";
import { useModuleContext } from "../hooks/useModuleContext";
import ModuleDetails from "./ModuleDetails";
import jsPDF from "jspdf";

const SearchBar = () => {
  const { module, dispatch } = useModuleContext();
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
    module.forEach((module, index) => {
      const y = 10 + index * 40;
      doc.text(`Title: ${module.Title}`, 10, y);
      doc.text(`Description: ${module.Description}`, 10, y + 20);
    });

    // Save the PDF as a file
    doc.save("module.pdf");
  };


  // Add null check before calling filter
  const filteredModule = module
    ? module.filter((module) =>
        module.Title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [dispatch];

  return (
    <div id ="Module_searchbar">
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="button" className="btn btn-secondary btn-sm"  onClick={clearSearch}>Clear</button>
      &nbsp;
      &nbsp;
      <button type="button" className="btn btn-primary btn-sm"  onClick={handleGeneratePDF}>Generate Report</button>
      {filteredModule.map((module) => (
        // Render filtered module details using ModuleDetails component
        <ModuleDetails key={module._id} module={module} />
      ))}
      {filteredModule.length === 0 && <p>No module found.</p>}
    </div>
  );
};

export default SearchBar;