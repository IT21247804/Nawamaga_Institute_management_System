import { AssignmentsContext } from "../context/AssignmentContext"
import { useContext } from "react"

export const useAssignmentsContext = () => {
  const context = useContext(AssignmentsContext)

  if(!context) {
    throw Error('useAssignmentsContext must be used inside an AssignmentsContextProvider')
  }

  return context
}