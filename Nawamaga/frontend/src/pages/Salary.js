import { useEffect } from "react"
import { useSalaryContext } from "../hooks/useSalaryContext"



//components
import SearchBar from "../components/SearchBar"
//import SalaryDetails from '../components/SalaryDetails'
import SalaryForm from "../components/SalaryForm"



const Salary =() =>{
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
            <SalaryForm/>
            <br></br>
            </div>

<div className="search">
                <SearchBar/>
                </div>
            
            <br></br>
            </div>

           
        
    )
                }   
                        
        
export default Salary