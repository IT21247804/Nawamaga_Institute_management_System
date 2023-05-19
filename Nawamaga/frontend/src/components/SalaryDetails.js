 
import { useState } from "react"
import {useSalaryContext} from '../hooks/useSalaryContext'

import {MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';





const SalaryDetails =({salary}) =>{
  
    const {dispatch} =useSalaryContext()
    //const [salaries, setSalaries] = useState([]);

    

    const [updateMode, setUpdateMode] = useState(false)
    const [updatedFullName, setUpdatedFullName] = useState(salary.FullName)
    const [updatedEmail, setUpdatedEmail] = useState(salary.Email)
    const [updatedNumberOfStudents, setUpdatedNumberOfStudents] = useState(salary.NumberOfStudents)
    const [updatedoneStudentFee, setUpdatedoneStudentFee] = useState(salary.oneStudentFee)
    const [updatedSal, setUpdatedSal] = useState(salary.Sal)
    const [updatedNetSalary, setUpdatedNetSalary] = useState(salary.NetSalary)
    //const [updatedPaymentDate, setUpdatedPaymentDate] = useState(salary.PaymentDate)
    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    const calc = () => {
      const updatedSal = updatedNumberOfStudents * updatedoneStudentFee
      setUpdatedSal(updatedSal)
      const updatedNetSalary = updatedSal - (updatedSal * 0.10)
      setUpdatedNetSalary(updatedNetSalary)
  }

  


    const handleUpdate = async () => {
      calc()
      const updatedsalary = { FullName:updatedFullName,Email:updatedEmail,NumberOfStudents:updatedNumberOfStudents,oneStudentFee:updatedoneStudentFee,Sal:updatedSal,NetSalary:updatedNetSalary,date}
      const response = await fetch('/api/Salary/' + salary._id, {
        method: 'PATCH',
        body: JSON.stringify(updatedsalary),
        headers: {
          'Content-Type': 'application/json',
          
        }
      })
      const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_SALARY', payload: json })
      setUpdateMode(false)
    }
  }
    
    
    const handleClick =async()=>{
        const response = await fetch('/api/Salary/'+salary._id,{
            method:'DELETE'
        })
        const json =await response.json()
        if(response.ok){
            dispatch({type:'DELETE_SALARY',payload:json})

        }
       
    } 
    
    
    return(
       

        
                   <div className="Update">
                     {updateMode ? (
                      <div>
                        <h3>Update Salary</h3>
                       <label for="exampleFormControlInput1" class="form-label h6">Full Name</label>
           <input 
              type="text" 
             class="form-control"
              onChange={(e) => setUpdatedFullName(e.target.value)}
              value={updatedFullName}
              
      />
      <br></br>

      <label for="exampleFormControlInput1" class="form-label h6">Email</label>
           <input 
              type="Email" 
              class="form-control"
              onChange={(e) => setUpdatedEmail(e.target.value)} 
              value={updatedEmail}
              
      />
      <br>
      </br>

    
      <label for="exampleFormControlInput1" class="form-label h6">No Of Students</label>
           <input 
              type="text" 
              class="form-control"
              onChange={(e) => setUpdatedNumberOfStudents(e.target.value)} 
              value={updatedNumberOfStudents}
              
      />
      <br>
      </br>
      <label for="exampleFormControlInput1" class="form-label h6">One Student Fee </label>
             <input 
              type="text" 
              class="form-control"
              onChange={(e) => setUpdatedoneStudentFee(e.target.value)} 
              value={updatedoneStudentFee}
              
      />
      <br></br>
      <label for="exampleFormControlInput1" class="form-label h6">Salary</label>
              <input 
              type="text" 
              class ="form-control"
              onChange={(e) => setUpdatedSal(e.target.value)} 
              value={updatedSal}disabled
            
      />
      
      <br></br>
      <label for="exampleFormControlInput1" class="form-label h6">Net Salary </label>
           <input 
              type="text" 
              class="form-control"
              onChange={(e) => setUpdatedNetSalary(e.target.value)} 
              value={updatedNetSalary}disabled
             
      />
      <br></br>
      <label for="exampleFormControlInput1" class="form-label h6">Payment Date</label>
           <input 
              type="Date" 
              class="form-control"
              onChange={(e) => (e.target.value)} 
              value={date}disabled
             
             
      />
      <br></br>
 

      <button className="btn btn-success d-letter-spacing "   onClick={handleUpdate}   >Update Salary</button>
       
                     </div>
                    
                     ):
                     
                     (
                     
                      
  
  
                      <MDBTable>
  
  <MDBTableBody>
   
      <tr key={salary.id} className="bg-light">
        <td id="tth1">{salary.FullName}</td>
        <td id="tth2">{salary.Email}</td>
        <td id="tth3">Rs.{salary.NetSalary}</td>
        <td id="tth3">{salary.date}</td>
       
        <td id="tth6">
          <button className="material-symbols-outlined" onClick={handleClick}>
            delete
          </button>
          <button className="material-symbols-outlined" onClick={() => setUpdateMode(true)}>
            edit
          </button>
          
        </td>
      </tr>
  
      </MDBTableBody>
      </MDBTable>
                
            

      )}
    </div>
  )
}
                     


                    
    

  

                     
    
  
    

    
export default SalaryDetails