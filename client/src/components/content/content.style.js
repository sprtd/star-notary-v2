import styled from "styled-components";

const ContentWrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 60vh;
  width: 80vw;
  align-items: center;
  
  h2 {
    margin-bottom: 5vh;
  }
`


const DappContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;


 

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
    font-size: 18px;
    width: 100%;
  }
  
  button {
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
    background: #555;
    color: #eee;
    font-size: 20px;
  }

`

export { ContentWrapper, DappContentWrapper, InputWrapper }