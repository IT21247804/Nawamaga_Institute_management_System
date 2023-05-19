import { useEffect } from "react"
import { useClassfeesContext } from "../hooks/useClassfeeContext"




// components
import StudentclassfeeSearchbar from "../components/StudentclassfeeSearchbar"



const Studentclassfee = () => {
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
      <StudentclassfeeSearchbar />
      
     
     
    
      
    </div>
    
  )
}

export default Studentclassfee
