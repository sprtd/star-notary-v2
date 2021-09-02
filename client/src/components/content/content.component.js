import React from 'react'
import { ContentWrapper, DappContentWrapper, InputWrapper } from './content.style'

const Content = () => {
  return (
    <ContentWrapper>
      <DappContentWrapper>
        <h2>StarNotary Token Dapp</h2>
        <span></span>
        <InputWrapper>
          <input type="text" placeholder='Enter Star Name...' />
          <input type="number" placeholder='Enter Star ID' />

          <button>Create Star</button>
        </InputWrapper>
      
      </DappContentWrapper>
    </ContentWrapper>
  )
}

export default Content
