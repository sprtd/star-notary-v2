import { useContext, useEffect } from 'react'
import { AccountContext } from '../../contexts/account-context'
import { FunctionContext } from '../../contexts/function-context'
import { getWeb3 } from '../../utils/getWeb3'
import Content from '../content/content.component'
import { MainLayoutWrapper } from './main-layout.style'
import Notary from '../../abi/Notary.json'

const MainLayout = () => {
  const { setWeb3Details } = useContext(AccountContext)
  const { setContractInstance } = useContext(FunctionContext)

  const enableWeb3 = async() => {
    try {
      const web3 = await getWeb3()
      const  accounts = await web3.eth.getAccounts()
      console.log(accounts)
      setWeb3Details(accounts[0])

      const networkId = await web3.eth.net.getId()
      // if(networkId !== 4) {
      //   alert('you are on the wrong network')
        
      // }


      console.log('this network id', networkId)
      const deployedNetwork = await Notary.networks[networkId]

      const notaryContractInstance = await new web3.eth.Contract(Notary.abi, deployedNetwork && deployedNetwork.address)
      setContractInstance(notaryContractInstance)
    
    } catch(err) {
      alert('Failed to load web3, accounts or contracts')
      console.log(err)
    }

  }

  useEffect(() => {
    enableWeb3()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
   <MainLayoutWrapper>
     <Content />
   </MainLayoutWrapper>
  )
}

export default MainLayout
