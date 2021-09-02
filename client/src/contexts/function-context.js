import { useState, createContext } from "react";


export const FunctionContext = createContext()

const FunctionContextProvider = ({ children })  => {

  const [contract, setContract] = useState(undefined)

  console.log('contract from context', contract)

  const setContractInstance = payload => {
    setContract(payload)
  }

  return(
    <FunctionContext.Provider value={{ setContractInstance, contract }}>
      { children }
    </FunctionContext.Provider>
  )
  
}

export default FunctionContextProvider