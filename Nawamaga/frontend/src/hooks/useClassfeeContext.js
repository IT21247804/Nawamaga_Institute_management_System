import { ClassfeesContext } from "../context/ClassfeeContext"
import { useContext } from "react"

export const useClassfeesContext = () => {
  const context = useContext(ClassfeesContext)

  if(!context) {
    throw Error('useclassfeesContext must be used inside an ClassfeesContextProvider')
  }

  return context
}