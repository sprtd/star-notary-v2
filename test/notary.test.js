const Notary = artifacts.require('./Notary.sol');



let notary, accounts, owner, addr1, addr2

contract('Notary',  async accs => {
  accounts = accs
  owner = accounts[0]
  addr1 = accounts[1]
  addr2 = accounts[2]

  beforeEach(async() => {
    notary = await Notary.deployed()

  })


  contract('Deployment', async() => {
    it('it has a name', async() => {
      const notaryName = await notary.name()
      assert.equal(notaryName, "Star Notary")
    })
  })

  contract('Transaction', async() => {
    it('can mint a star', async() => {
      let name = 'Try again'
      let id = 2
      await notary.createStar(name, id, { from: owner})
      const starInfo = await notary.tokenIdToStarInfo.call(id)
      console.log('this is the star info :', starInfo)
      assert.equal(name, starInfo)
    })

    it('lets owner put up star for sale', async() => {

     let starId = 3;
     let starPrice = web3.utils.toWei(".01", "ether")
     let starName = 'Keep pushing'
     await notary.createStar(starName, starId, { from: owner })
     await notary.putStarUpForSale(starId, starPrice, { from: owner })
     assert.equal(await notary.starsForSale(starId), starPrice)

    })

    // it('can make an address payable', async() => {

    //   let addr1Balance = await web3.eth.getBalance(addr1)
    //   console.log({ "address one balance": addr1Balance})
      
    //   const amount = web3.utils.toWei("10", "ether")
    //  await web3.eth.sendTransaction({ from: addr2, to: addr1, value: amount })
      
    //    addr1Balance = await web3.eth.getBalance(addr1)

      
    //  console.log({ "address one balance": addr1Balance})
    
    // })

    it('let\s account1  get the funds after star sale', async() => {
      let star4 = 4;
      let starPrice = web3.utils.toWei('10', 'ether' )
      let addr1BalanceBeforeSale = await web3.eth.getBalance(addr1)
      await notary.createStar('super star', star4, { from: addr1})
      await notary.putStarUpForSale(star4, starPrice, { from: addr1})
      // assert.equal(await notary.starsForSale(star4), starPrice)
      await notary.buyStar(star4, { from: addr2, value: starPrice })
      let addr1BalanceAfterSale = await web3.eth.getBalance(addr1)

      assert.equal(addr1BalanceAfterSale, addr1BalanceBeforeSale + starPrice)
    })
  })
})