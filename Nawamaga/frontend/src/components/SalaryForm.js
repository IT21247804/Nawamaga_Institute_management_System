import { useState } from "react"
import { useSalaryContext } from "../hooks/useSalaryContext"
//import Salary from "../pages/Salary"


const SalaryForm =()=>{
    const{dispatch} =useSalaryContext()

const[FullName,setFullName]=useState('')
const[Email,setEmail]=useState('')
const[NumberOfStudents,setNumberOfStudents]=useState('')
const[oneStudentFee,setoneStudentFee]=useState('')
const[Sal,setSal]=useState('')
const[NetSalary,setNetSalary]=useState('')
//const[PaymentDate,setPaymentDate]=useState('')
const today = new Date();
const date = today.toISOString().slice(0, 10);
const[error,setError] =useState(null)
const[emptyFields,setEmptyFields] =useState([])

const calc = () => {
    const Sal = NumberOfStudents * oneStudentFee
    setSal(Sal)
    const NetSalary = Sal - (Sal * 0.10)
    setNetSalary(NetSalary)
}

const handleSubmit  =async (e) =>{
    calc()
    e.preventDefault()
    

    const Salary ={FullName,Email,NumberOfStudents,oneStudentFee,Sal,NetSalary,date}
    const response = await fetch('/api/Salary',{
        method :'POST',
        body   :JSON.stringify(Salary),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json =await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)

    }
    if(response.ok){
       
        setFullName('')
        setEmail('')
        setNumberOfStudents('')
        setoneStudentFee('')
        setSal('')
        setNetSalary('')
        setError(null)
        setEmptyFields([])

        
       
        alert('New Salary added')
        dispatch({type:'CREATE_SALARY',payload:json})
    }
     
   
}


    return(
        
        <div>
           
            
        <h3>Add a New Salary</h3>

        <form className="create" onClick={handleSubmit}>
            
           <br></br>
           <div className="formCreate">
            <div class="row">
                <div class="col">
                <label for="exampleFormControlInput1" class="form-label h6">Full Name</label>
           <input 
              type="text" 
              class="form-control"
              onChange={(e) => setFullName(e.target.value)} 
              value={FullName}
              className={emptyFields.includes('FullName')?'error':''}
      />
     </div>
     <div class="col">

     <label for="exampleFormControlInput1" class="form-label h6">Email</label>
           <input 
              type="Email" 
              class="form-control"
              onChange={(e) => setEmail(e.target.value)} 
              value={Email}
              className={emptyFields.includes('Email')?'error':''}
      />
      </div>
      </div>

<div className="row">
    <div className="col">
    
    <label for="exampleFormControlInput1" class="form-label h6">No Of Students</label>
           <input 
              type="number" 
              onChange={(e) => setNumberOfStudents(e.target.value)} 
              value={NumberOfStudents}
              className={emptyFields.includes('NumberOfStudents')?'error':''}
      />
      </div> <div className="col">


     
      <label for="exampleFormControlInput1" class="form-label h6">One Student Fee </label>
             <input 
              type="text" 
              onChange={(e) => setoneStudentFee(e.target.value)} 
              value={oneStudentFee}
              className={emptyFields.includes('oneStudentFee')?'error':''}
      />
      </div>
      </div>
      <div>
      <label for="exampleFormControlInput1" class="form-label h6">Salary</label>
              <input 
              type="text" 
              onChange={(e) => setSal(e.target.value)} 
              value={Sal}disabled
              
      />
     
    </div>
    <label for="exampleFormControlInput1" class="form-label h6">Net Salary</label>
           <input 
              type="text" 
              onChange={(e) => setNetSalary(e.target.value)} 
              value={NetSalary}disabled
              
      />
     
     <label for="exampleFormControlInput1" class="form-label h6">Payemnt Date</label>
           <input 
              type="Date" 
              onChange={(e) => (e.target.value)} 
              value={date}disabled
            
             
      />
     
     <button type="submit" class="btn btn-success d-letter-spacing "  style={{ width: "200px" }} >Add</button>
        {error && <div className="error">{error}</div>}
        
        
        
</div>
       </form>  
       <br></br>  
      </div> 


    )
 

}
export default SalaryForm