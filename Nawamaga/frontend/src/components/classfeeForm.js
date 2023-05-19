import { useState } from 'react'
import { useClassfeesContext } from '../hooks/useClassfeeContext'


const ClassfeeForm = () => {
  const { dispatch } = useClassfeesContext()

  const [studentno, setstudentno] = useState('')
  const [subject, setsubject] = useState('')
  const [classtype, setclasstype] = useState('')
  const [email, setemail] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    

    const classfee = {studentno, subject,classtype, email}
    
    const response = await fetch('/api/classfees', {
      method: 'POST',
      body: JSON.stringify(classfee),
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
      setstudentno('')
      setsubject('')
      setclasstype('')
      setemail('')
      
      
      dispatch({type: 'CREATE_CLASSFEE', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <center>
       
    <h3 id = "classtext">Add New  Payment </h3><br/>
    <div className="card" id="feecard">
    <div className="form">
      <label id="classlabel">
        Student No :
        <input id='stdno'
          type="number"
          onChange={(e) => setstudentno(e.target.value)}
          value={studentno}
        />
      </label>

      <label id="classlabel">
        Subject stream :
        <div className="selectform">
          <select
            name="selectedsubject"
            onChange={(e) => setsubject(e.target.value)}
            value={subject}
            className={emptyFields.includes("subject") ? "error" : ""}
          >
            <option value="subject"> Subject</option>
            <option value="Biology stream">Biology stream</option>
            <option value="Mathematics stream">Mathematics stream</option>
            <option value="Technology stream">Technology stream</option>
          </select>
        </div>
      </label>


      <label id="classlabel">
        Type :
        <div className="selectform">
          <select
            name="selectedlevel"
            onChange={(e) => setclasstype(e.target.value)}
            value={classtype}
            className={emptyFields.includes("classtype") ? "error" : ""}
          >
            <option value="Type"> Type</option>
            <option value="Theory">Theory</option>
            <option value="Revision">Revision</option>
          </select>
        </div>

      </label>
      <label id="classlabel">
        Email :
      
      <input id='stdno'
          type="string"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
         <button class="btn btn-outline-primary">Add class fee</button>

</label>

     
      {error && <div className="error">{error}</div>}
      </div>
      </div>
      
      </center>
    </form>
    
    
    
  )
}

export default ClassfeeForm