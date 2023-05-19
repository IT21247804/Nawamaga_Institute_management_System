import { useState } from 'react'
import { useAssignmentsContext } from '../hooks/useAssignmentsContext'

const AssignmentForm = () => {
  const { dispatch } = useAssignmentsContext()

  const [topic, setTopic] = useState('')
  const [number, setNumber] = useState('')
  const [description, setDescription] = useState('')
  const [date, setdate] = useState('')

  //const [duedate, setDueDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])    

  const handleSubmit = async (e) => {
    e.preventDefault()

    const assignment = {topic, description, number,date}
    
    const response = await fetch('/api/assignments', {
      method: 'POST',
      body: JSON.stringify(assignment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])  
      setError(null)
      setTopic('')
      setNumber('')
      setDescription('')
      setdate('')
      // setDueDate('')
      
      dispatch({type: 'CREATE_ASSIGNMENT', payload: json})
    }

  }

  return (
    
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Assignment</h3>
      <br></br>

      <br></br>
      <label> Assignment Topic: </label> 
      <input type="text" onChange={(e) => setTopic(e.target.value)} value={topic} style={{ width: "1000px", height: "35px", borderRadius: "5px" }} />
      <br></br>

      {/* <label>Topic:</label>
      <input 
        type="text" 
        onChange={(e) => setTopic(e.target.value)} 
        value={topic}
        className={emptyFields.includes('topic') ? 'error' : ''}
      /> */}


      <label>Assignment Number: </label> 
      <input type="number" onChange={(e) => setNumber(e.target.value)} value={number} style={{ width: "1000px", height: "35px", borderRadius: "5px" }} />
      <br></br>
      

      {/* <label>Number:</label>
      <input 
        type="number" 
        onChange={(e) => setNumber(e.target.value)} 
        value={number}
        className={emptyFields.includes('number') ? 'error' : ''}
      /> */}


      <label> Assignment Description: </label> 
      <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} style={{ width: "1000px", height: "35px" , borderRadius: "5px"}} />
      <br></br>

      <label> Due Date: </label> 
      <input type="Date" onChange={(e) => setdate(e.target.value)} value={date} style={{ width: "1000px", height: "35px" , borderRadius: "5px"}} />


      {/* <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      /> */}

      {/* <label> Enter Due Date: </label> 
      <input type="date" onChange={(e) => setDueDate(e.target.value)} value={duedate} style={{ width: "1000px", height: "35px" , borderRadius: "5px"}} />
      <br></br> */}


   

      <button>Add Assignment</button>
      
      {error && <div className="error">{error}</div>}
     </form>
   
  )
}

export default AssignmentForm