import { useState, useContext } from 'react'
import { AccountContext } from '../../contexts/account-context'
import { FunctionContext } from '../../contexts/function-context'
import { TabsContext } from '../../contexts/tabs-context'
import Tabs from '../tabs/tabs.component'
import { ContentWrapper, DappContentWrapper, InputWrapper } from './content.style'

const Content = () => {
  const { createStar, lookUpStar: displayLookUp, exchangeStar, transferStar } = useContext(TabsContext)


  const { contract } = useContext(FunctionContext)
  const { web3Account } = useContext(AccountContext)
  const [starName, setStarName] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [lookUpId, setLookUpId] = useState('')
  const [starMetaData, setStarMetaData] = useState('')


  // create star event
  const initialCreateStar = {
    id: '',
    newStarName: '',
    createdBy: ''
  }
  const [createStarResult, setCreateStarResult] = useState(initialCreateStar)

  const { id, newStarName, createdBy } = createStarResult

  // exchange stars state
  const [account2, setAccount2] = useState('')
  const [tokenId1, setTokenId1] = useState('')
  const [tokenId2, setTokenId2] = useState('')


  // transfer star state
  const [recipient, setRecipient] = useState('')

  // create new star
  const mintStar = async() => {
    try {

     const mintResult =  await contract.methods.createStar(starName, tokenId).send({ from: web3Account})
      
    const { createdBy, newStarId: id, newStarName } = mintResult.events.StarCreated.returnValues
    setCreateStarResult({ id, newStarName, createdBy })
      setStarName('')
      setTokenId('')
      
    } catch(err) {
      console.log(err)
    }
  }


  const lookUpStar = async() => {
    try{
      const result = await contract.methods.lookUpTokenIdToStarInfo(lookUpId).call()
      setStarMetaData(result)
      setLookUpId('')

    } catch(err) {
      console.log(err)
    }
  }

  const handleExchangeStars = async() => {
    try {
      await contract.methods.exchangeStars(tokenId1, account2, tokenId2, web3Account).send({ from: web3Account })
      setTokenId1('')
      setTokenId2('')
      account2('')
    } catch(err) {
      console.log(err)
    }
  }

  const handleTransfer = async() => {
    try {
      await contract.methods.transferStar(web3Account, recipient, tokenId).send({ from: web3Account})
      setRecipient('')
      setTokenId('')
    } catch(err) {
      console.log(err)
    }
  }


  const { _star, _starId, _starOwner } = starMetaData

  return (
    <ContentWrapper>
      
      
      <Tabs />
      <span></span>
      <h2> Star Notary Dapp </h2>
      <DappContentWrapper>

       
        <InputWrapper style={{display: createStar ? 'flex' : 'none'}}>
          <input type="text" placeholder='Enter star name...' onChange={e => setStarName(e.target.value)} value={ starName }  />
          <input type="text" placeholder='Approve this address...' onChange={e => setTokenId(e.target.value) }  value={ tokenId } />

          <button onClick={ mintStar }>Create Star</button>

          { id ? <p><b>Star ID:</b> { id }</p> : null}
          { newStarName ? <p> <b>Star name:</b> { newStarName }</p> : null}
          { createdBy ? <p><b>Star Owner:</b> { createdBy }</p> : null}
        </InputWrapper>

        <InputWrapper style={{display: displayLookUp ? 'flex' : 'none'}}>
          <input type="number" placeholder='Enter Star ID' onChange={e => setLookUpId(e.target.value) }  value={ lookUpId } />

          <button onClick={ lookUpStar }>Look Up Star</button>
          { starMetaData ? <p> <b>Star name:</b> { _star }</p> : null}
          { starMetaData ? <p><b>Star ID:</b> {_starId }</p> : null}
          { starMetaData ? <p><b>Star Owner:</b> { _starOwner }</p> : null}
        </InputWrapper>

        <InputWrapper style={{display: exchangeStar ? 'flex' : 'none'}}>
          <input type="number" placeholder='Enter tokenID 1...' onChange={e => setTokenId1(e.target.value) }  value={ tokenId1 } />
          <input type="number" placeholder='Enter tokenID 2...' onChange={e => setTokenId2(e.target.value) }  value={ tokenId2 } />
          <input type="text" placeholder='Enter recipient... ' onChange={e => setAccount2(e.target.value) }  value={ account2 } />
          <button onClick={ handleExchangeStars }>Exchange Stars</button>
        </InputWrapper>



        <InputWrapper style={{display: transferStar ? 'flex' : 'none'}}>
          <input type="number" placeholder='Enter tokenID...' onChange={e => setTokenId(e.target.value)} value={ tokenId }  />
          <input type="text" placeholder='Enter recipient address...' onChange={e => setRecipient(e.target.value) }  value={ recipient } />
          <button onClick={ handleTransfer }>Transfer Star</button>
        </InputWrapper>
      
      </DappContentWrapper>
    </ContentWrapper>
  )
}

export default Content
