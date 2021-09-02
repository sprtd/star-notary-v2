import { createContext, useState } from "react";

export const AccountContext = createContext()


const AccountContextProvider = ({ children }) => {
  const [web3Account, setWeb3Account] = useState('')

  const setWeb3Details = payload => {
    setWeb3Account(payload)

  }

  return (
    <AccountContext.Provider value={{ setWeb3Details, web3Account }}>
      { children }
    </AccountContext.Provider>
  )
} 

export default AccountContextProvider