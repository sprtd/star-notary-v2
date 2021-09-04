import { useState, useContext } from 'react'
import { AccountContext } from '../../contexts/account-context'
import { FunctionContext } from '../../contexts/function-context'
import { TabsContext } from '../../contexts/tabs-context'
import Tabs from '../tabs/tabs.component'
import { ContentWrapper, DappContentWrapper, InputWrapper } from './content.style'

const Content = () => {
  const { createStar, lookUpStar: displayLookUp } = useContext(TabsContext)

  console.log('from where needed', createStar)

  const { contract } = useContext(FunctionContext)
  const { web3Account } = useContext(AccountContext)
  const [starName, setStarName] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [lookUpId, setLookUpId] = useState('')
  const [starMetaData, setStarMetaData] = useState('')

  console.log(tokenId)
  console.log(starName)

  const mintStar = async() => {
    try {

      // console.log({ "contract here": contract })
      await contract.methods.createStar(starName, tokenId ).send({ from: web3Account})
      // const name = await contract.methods.name.
      // console.log('name', name)
    } catch(err) {
      console.log(err)
    }

  }

  const lookUpStar = async() => {
    try{
      const result = await contract.methods.lookUpTokenIdToStarInfo(lookUpId).call()
      console.log('this is the fetched result', result)
      setStarMetaData(result)

    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <ContentWrapper>
      
      
      <Tabs />
      <span></span>
      <DappContentWrapper>
       
        <InputWrapper style={{display: createStar ? 'flex' : 'none'}}>
          <input type="text" placeholder='Enter star name...' onChange={e => setStarName(e.target.value)} value={ starName }  />
          <input type="text" placeholder='Approve this address...' onChange={e => setTokenId(e.target.value) }  value={ tokenId } />

          <button onClick={ mintStar }>Create Star</button>
        </InputWrapper>

        <InputWrapper style={{display: displayLookUp ? 'flex' : 'none'}}>
          <input type="number" placeholder='Enter Star ID' onChange={e => setLookUpId(e.target.value) }  value={ lookUpId } />

          <button onClick={ lookUpStar }>Look Up Star</button>
          { starMetaData.length ? <p>{starMetaData}</p> : null}
        </InputWrapper>
      
      </DappContentWrapper>
    </ContentWrapper>
  )
}

export default Content
