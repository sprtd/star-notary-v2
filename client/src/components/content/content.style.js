import styled from "styled-components";

const ContentWrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  width: 60vw;
  align-items: center;
  h2 {
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 50px;

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