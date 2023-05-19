import { useEffect } from "react"
import { useClassfeesContext } from "../hooks/useClassfeeContext"



// components
//import ClassfeeDetails from "../componenets/ClassfeeDetails"
import ClassfeeForm from "../components/classfeeForm"
import SearchBar from "../components/classfeeSearchBar"


const ClassfeeHome = () => {
  const { classfees, dispatch } = useClassfeesContext()

  useEffect(() => {
    const fetchClassfees = async () => {
      const response = await fetch('/api/classfees')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CLASSFEES', payload: json})
      }
    }

    fetchClassfees()
  }, [dispatch])

  return (
    <div className="paymhome">
      <ClassfeeForm /><br/><br/><br/><br/>
      <SearchBar />
      
     
    
      
    </div>
    
  )
}

export default ClassfeeHome
