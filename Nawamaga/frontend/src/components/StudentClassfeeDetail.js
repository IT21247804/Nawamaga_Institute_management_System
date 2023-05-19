
import { useClassfeesContext } from '../hooks/useClassfeeContext'
import { useState } from "react"


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StudentclassfeeDetail = ({ classfee }) => {
  const { dispatch } = useClassfeesContext()

  //update................

  const [updateMode, setUpdateMode] = useState(false)
  const [updatedstudentno, setUpdatedstudentno] = useState(classfee.student)
  const [updatedsubject, setUpdatedsubject] = useState(classfee.subject)
  const [updatedclasstype, setUpdatedclasstype] = useState(classfee.updatedclasstype) 
  const[updatedemail, setUpdatedemail] = useState(classfee.email)
  
  const handleUpdate = async () => {
    const updatedclassfee = { studentno: updatedstudentno, subject: updatedsubject, classtype: updatedclasstype, email: updatedemail}
    const response = await fetch('/api/classfees/' + classfee._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedclassfee),
      headers: {
        'Content-Type': 'application/json',    
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_CLASSFEE', payload: json })
      setUpdateMode(false)
    }
  }

  const handleClick = async () => {
    const response = await fetch('/api/classfees/' + classfee._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CLASSFEE', payload: json})
    }
  }

  return (
    
    <div className="form">
      {updateMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUpdatedstudentno(e.target.value)}
            value={updatedstudentno}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedsubject(e.target.value)}
            value={updatedsubject}
          />
          <input
            type="text"
            onChange={(e) => setUpdatedclasstype(e.target.value)}
            value={updatedclasstype}
          />
           <input
            type="text"
            onChange={(e) => setUpdatedemail(e.target.value)}
            value={updatedemail}
          />
          
          <button onClick={handleUpdate}>Update </button>
        </div>
      ) : (
        <table id ="t1">
  
  <tbody>
   
      <tr key={classfee.id}>
        <td id="tth1">{classfee.studentno}</td>
        <td id="tth2">{classfee.subject}</td>
        <td id="tth3">{classfee.classtype}</td>
        <td id="tth5">{classfee.email} </td>
        
       
      </tr>
  
  </tbody>
</table>

      )}
    </div>
  )
}

export default StudentclassfeeDetail