import { useContext, useState } from "react"
import { TabsContext } from "../../contexts/tabs-context"
import { TabWrapper } from "./tabs.style"

const Tabs = () => {
  const { handleCreateStar, createStar,  handleLookUpStar, lookUpStar,  handleExchangeStar, exchangeStar,  handleTransferStar, transferStar } = useContext(TabsContext)
 
  return(
    <TabWrapper>
      <h3 onClick={() => handleCreateStar(true)} style={{background: createStar ? 'red' : 'none', color: createStar ? '#fff' : '#000'}} >Create Star</h3>
      <h3  onClick={() => handleLookUpStar(true)}  style={{background: lookUpStar ? 'red' : 'none', color: lookUpStar  ? '#fff' : '#000'}}>Look Up Star</h3>
      <h3 onClick={() => handleExchangeStar(true)} style={{background: exchangeStar ? 'red' : 'none', color: exchangeStar  ? '#fff' : '#000'}}  >Exchange Stars</h3>
      <h3  onClick={() => handleTransferStar(true)}  style={{background: transferStar ? 'red' : 'none', color: transferStar  ? '#fff' : '#000'}}   >Transfer Star</h3>
    </TabWrapper>
  )

}

export default Tabs