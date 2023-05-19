import { useAssignmentsContext } from '../hooks/useAssignmentsContext'
import { useState } from "react"



const AssignmentDetails = ({ assignment }) => {
  const { dispatch } = useAssignmentsContext()

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedTopic, setUpdatedTopic] = useState(assignment.topic)
  const [updatedNumber, setUpdatedNumber] = useState(assignment.number)
  const [updatedDescription, setUpdatedDescription] = useState(assignment.description)
  const [updateddate, setUpdateddate] = useState(assignment.date)


  const handleUpdate = async () => {
    const updatedclassfee = { topic: updatedTopic, number: updatedNumber, description:updatedDescription,date:updateddate}
    const response = await fetch('/api/assignments/' + assignment._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedclassfee),
      headers: {
        'Content-Type': 'application/json',    
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_ASSIGNMENT', payload: json })
      setUpdateMode(false)
    }
  }

  const handleClick = async () => {
    const response = await fetch('/api/assignments/' + assignment._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ASSIGHMENT', payload: json})
    }
  }


  



  return (

    <div className="feedback-details">
    {updateMode ? (
      <div>
        <input
          type="text"
          onChange={(e) => setUpdatedTopic(e.target.value)}
          value={updatedTopic}
        />
        <input
          type="text"
          onChange={(e) => setUpdatedNumber(e.target.value)}
          value={updatedNumber}
        />
        <input
          type="text"
          onChange={(e) => setUpdatedDescription(e.target.value)}
          value={updatedDescription}
        />
        <input
          type="Date"
          onChange={(e) => setUpdateddate(e.target.value)}
          value={updateddate}
        />
        <button onClick={handleUpdate}>Update Assignments</button>
      </div>
    ) :(

    <div className="assignment-details">
      
      <h4>{assignment.topic}</h4>
      <p><strong>Number: </strong>{assignment.number}</p>
      <p><strong>Description: </strong>{assignment.description}</p>
      <p><strong>Due Date: </strong>{assignment.date}</p>

      {/* <p><strong> Due Date </strong>{assignment.duedate}</p> */}
      
      <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
      <button className="material-symbols-outlined" onClick={()=>setUpdateMode(true)}>Edit</button>
    </div>
  )
  
}
</div>
  );
};

export default AssignmentDetails