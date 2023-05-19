import { createContext, useReducer } from 'react'

export const ClassfeesContext = createContext()

export const classfeesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CLASSFEES':
        return { 
          classfees: action.payload 
        }
      case 'CREATE_CLASSFEE':
        return { 
          classfees: [action.payload, ...state.classfees] 
        }

        case 'UPDATE_CLASSFEE':
      return {
        classfees: state.classfees.map(classfee =>
          classfee._id === action.payload._id ? action.payload : classfee
        ),
      }
      case 'DELETE_CLASSFEE':
        return{
          classfees: state.classfees.filter(n => n._id !== action.payload._id) 
        
        }
      default:
        return state
    }
  }
export const ClassfeesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(classfeesReducer, { 
      classfees: null
    })
    
    return (
      <ClassfeesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </ClassfeesContext.Provider>
    )
  }
