import styled from "styled-components";

const ContentWrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  width: 60vw;
  align-items: center;
`


const DappContentWrapper = styled.div`
  h2 {
    font-weight: 300;

  }

  span {
    width: 60%;
    background: #000;
    height: 4px;
    border-radius: 5px;
  }
  
  

`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  input {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 10px;
    margin-bottom: 10px;
    display: block;
    width: 100%;
  }
  
  button {
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
    background: #555;
    color: #eee;
  }


`

export { ContentWrapper, DappContentWrapper, InputWrapper }