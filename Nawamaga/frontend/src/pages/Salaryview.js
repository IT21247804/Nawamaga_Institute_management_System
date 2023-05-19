import { useEffect } from "react"
import { useSalaryContext } from "../hooks/useSalaryContext"



//components
import SalarySearchBar from "../components/SalarySearchBar"
//import SalaryDetails from '../components/SalaryDetails'




const Salaryview =() =>{
    const {salaries,dispatch} =useSalaryContext()

    

    useEffect(()=>{
        const fetchSalary = async() =>{
            const response = await fetch('/api/Salary')
            const json =await response.json()

            if(response.ok){
               
                dispatch({type:'SET_SALARYS',payload:json})

            }


        }
        fetchSalary()

    },[dispatch])

    

    return (
        <div className="salary">
          <div className="salaryform" >
            
            <br></br>
            </div>

<div className="search">
                <SalarySearchBar />
                </div>
            
            <br></br>
            </div>

           
        
    )
                }   
                        
        
export default Salaryview