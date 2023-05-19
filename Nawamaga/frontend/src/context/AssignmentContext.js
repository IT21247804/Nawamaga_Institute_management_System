import { createContext, useReducer } from 'react'

export const AssignmentsContext = createContext()

export const assignmentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ASSIGNMENTS':
      return { 
        assignment: action.payload 
      }
    case 'CREATE_ASSIGNMENT':
      return { 
        assignment: [action.payload, ...state.assignment] 
      }
    case 'DELETE_ASSIGNMENT':
      return { 
        assignment: state.assignment.filter(w => w._id !== action.payload._id) 
      }
      case 'UPDATE_ASSIGNMENT':
        return{
          assignment:state.assignment.map(assignment=>
            assignment._id ===action.payload._id?action.payload:assignment),
            
        }
    default:
      return state
  }
}

export const AssignmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assignmentsReducer, { 
    assignment: null
  })
  
  return (
    <AssignmentsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AssignmentsContext.Provider>
  )
}