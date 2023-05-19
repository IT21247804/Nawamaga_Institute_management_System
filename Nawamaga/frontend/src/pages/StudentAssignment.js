import { useEffect } from "react"
import { useAssignmentsContext } from "../hooks/useAssignmentsContext"

// components

import AssignmentForm from "../components/assignmentForm"
import StudentAssignmentSearchBar from "../components/StudentAssignmentSearch"

const StudentAssignmentHome = () => {
  const { assignment, dispatch } = useAssignmentsContext()

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch('/api/assignments')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ASSIGNMENTS', payload: json})
      }
    }

    fetchAssignments()
  }, [dispatch])

  return (
    <div className="home">
       
     <StudentAssignmentSearchBar/>
     
    </div>
  )
}

export default StudentAssignmentHome