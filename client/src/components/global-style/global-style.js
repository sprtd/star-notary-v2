import styled, { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    
   
  }

`

const RootInterface = styled.div`

  width: 100vw;
  height: 100vh;


`

export { GlobalStyle, RootInterface }