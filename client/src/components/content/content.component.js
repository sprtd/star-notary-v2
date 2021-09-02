import { useState, useContext } from 'react'
import { AccountContext } from '../../contexts/account-context'
import { FunctionContext } from '../../contexts/function-context'
import { ContentWrapper, DappContentWrapper, InputWrapper } from './content.style'

const Content = () => {

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
       <h2>StarNotary Token Dapp</h2>
        <span></span>
      <DappContentWrapper>
       
        <InputWrapper>
          <h3>Create Star</h3>
          <input type="text" placeholder='Enter Star Name...' onChange={e => setStarName(e.target.value)} value={ starName }  />
          <input type="number" placeholder='Enter Star ID' onChange={e => setTokenId(e.target.value) }  value={ tokenId } />

          <button onClick={ mintStar }>Create Star</button>
        </InputWrapper>

        <InputWrapper>
          <h3>Look Up Star</h3>
          <input type="number" placeholder='Enter Star ID' onChange={e => setLookUpId(e.target.value) }  value={ lookUpId } />

          <button onClick={ lookUpStar }>Look Up Star</button>
          { starMetaData.length ? <p>{starMetaData}</p> : null}
        </InputWrapper>
      
      </DappContentWrapper>
    </ContentWrapper>
  )
}

export default Content
