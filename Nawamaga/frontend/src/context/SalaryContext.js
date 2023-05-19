import { createContext, useReducer } from "react";
import Salary from "../pages/Salary";


export const SalaryContext = createContext()
export const salariesReducer =(state,action) =>{
    switch(action.type){
        case 'SET_SALARYS':
            return {
                salaries:action.payload
            }
            case 'CREATE_SALARY':
                return{
                    salaries:[action.payload,...state.salaries]
                }
                case 'DELETE_SALARY':
                    return{
                        salaries:state.salaries.filter((s) =>s._id !== action.payload._id)
                    }
                    case 'UPDATE_SALARY':
                     return { 
                        salaries: state.salaries.map(salary =>
                            salary._id === action.payload._id ? action.payload : salary
                        ),
                      }
                    
                   
                default:
                    return state
    }
    

}


export const SalaryContextProvider =({children}) =>{
    const [state,dispatch] =useReducer(salariesReducer,{
        salaries:null
        
    })
   
    
    return(
        <SalaryContext.Provider value={{...state,dispatch}}>
            {children}

        </SalaryContext.Provider>
    )
}
