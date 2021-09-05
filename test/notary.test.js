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
    it('can add the name and star symbol properly', async() => {
      const starName = await notary.name()
      const starSymbol = await notary.symbol()
      assert.equal(starName, "Star Notary")
      assert.equal(starSymbol, "STN")
    })
  })

  contract('Minting', async() => {
    it('can mint a star & returns star id/star name/star owner after minting', async() => {
      let name = 'Try again'
      let id = 1
      await notary.createStar(name, addr1, {from: owner})
      const starInfo = await notary.lookUpTokenIdToStarInfo.call(id)
      const { _starId, _star, _starOwner } = starInfo
      console.log('this is the star id :', _starId)
      console.log('this is the star :', _star )
      console.log('this is the star owner :', _starOwner )
      assert.equal(_starId, id)
      assert.equal(name, _star)
      assert.equal(_starOwner, owner)
    })
  })

  contract('Exchange Stars', async() => {
    it('lets 2 users exchange stars', async() => {
      let tokenId1 = 1, tokenId2 = 2;
      let starName1 = 'Test 1'
      let starName2 = 'Test 2'
      await notary.createStar(starName1, addr1, { from: owner })
      await notary.createStar(starName2, owner, { from: addr1 })

      await notary.exchangeStars(tokenId1, addr1, tokenId2, owner)
      
      const newOwnerToken1 = await notary.getOwnerOf.call(tokenId1)
      const newOwnerToken2 = await notary.getOwnerOf.call(tokenId2)

      console.log(newOwnerToken1)
      console.log(newOwnerToken2)

      assert.equal(newOwnerToken1, addr1)
      assert.equal(newOwnerToken2, owner)
    })
  })

  contract('Transfer Star', async() => {
    it('lets user transfer star', async() => {
      let totalStars = await notary.tokenId()
      console.log('total stars before creating more stars: ', totalStars.toNumber())

      let starName1 = 'Alpha 1',
      starName2 = 'Alpha 2',
      starName3 = 'Alpha 3'

      await notary.createStar(starName1, addr1, { from: owner })
      await notary.createStar(starName2, addr1, { from: owner })
      await notary.createStar(starName3, addr1, { from: owner })



      let totalBalanceOfAccount1BeforeTransfer = await notary.getBalanceOf(owner)
      let totalBalanceOfAccount2BeforeTransfer = await notary.getBalanceOf(addr1)
      
      console.log('total stars owned by deployer address before star transfer', totalBalanceOfAccount1BeforeTransfer.toNumber())
      
      await notary.transferStar(owner, addr1, 3)
      let totalBalanceOfAccount1AfterTransfer = await notary.getBalanceOf(owner)
      let totalBalanceOfAccount2AfterTransfer = await notary.getBalanceOf(addr1)

      let starNewOwner = await notary.getOwnerOf(3)

      
      console.log('total stars owned by account 1 after star transfer', totalBalanceOfAccount1AfterTransfer.toNumber())
      console.log('total stars owned by account 2 after star transfer', totalBalanceOfAccount2AfterTransfer.toNumber())
      assert.equal(totalBalanceOfAccount1AfterTransfer, totalBalanceOfAccount1BeforeTransfer - 1)
      assert.equal(totalBalanceOfAccount2AfterTransfer.toNumber(), totalBalanceOfAccount2BeforeTransfer + 1)

      assert.equal(starNewOwner, addr1)
    })

  })

  

  
})