// SPDX-License-Identifier: MIT

pragma solidity >=0.4.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Notary is ERC721 {
    string private starName = "Star Notary";
    string private starSymbol = "STN";
    uint public tokenId;


  struct Star {
    uint tokenId;
    string name;
  }
  

  mapping(uint => Star) public tokenIdToStarInfo;
    
  mapping(uint => uint) public starsForSale;
    // bool approved;
    
  constructor() ERC721(starName, starSymbol)  {
    tokenId = 0;
  }


  function createStar( string memory _name, address _to) public {
    starName = _name;
    tokenId += 1;
    Star memory newStar = Star({ name: starName, tokenId: tokenId});
    tokenIdToStarInfo[tokenId] = newStar;
    setApprovalForAll(_to, true);
    _mint(msg.sender, tokenId);
  }
  

  function putStarUpForSale(uint _tokenId, uint price_, address to_) public {
      require(_tokenId > 0, "tokenId must not be zero");
      require(price_ > 0, "token price must not be zero");
    require(ownerOf(_tokenId) == msg.sender, "Only token owner can put up token for sell");
  
    setApprovalForAll(to_, true);
    starsForSale[_tokenId] = price_;

  }
    
  function lookUpTokenIdToStarInfo(uint _tokenId) public view returns(uint _starId, string memory _star, address _starOwner) {
      _starId = tokenIdToStarInfo[_tokenId].tokenId;
      _star = tokenIdToStarInfo[_tokenId].name;
      _starOwner = ownerOf(_starId);
      
      
  }

  // convert address into payable address
  function _make_payable(address account_)  internal pure returns(address payable) { 
    return payable(account_);

  }

  function buyStar(uint256 _tokenId) public payable {
    require(starsForSale[_tokenId] > 0, "The star should be up for sale"); 
    uint256 starCost = starsForSale[_tokenId];
    address ownerAddress = ownerOf(_tokenId);
    require(msg.value >= starCost, "Your ETH balance must be >= the price of star");
    
    safeTransferFrom(ownerAddress, msg.sender, _tokenId);
    address  payable payableOwnerAddress = _make_payable(ownerAddress);
    address payable payableMsgSender = _make_payable(msg.sender);
    payableOwnerAddress.transfer(starCost);
    if(msg.value > starCost) {
      payableMsgSender.transfer(msg.value - starCost);
    }


      emit Transfer(ownerAddress, msg.sender, _tokenId);
    }

  function transferStar(address _from, address _to, uint256 _tokenId) public {
    require(ownerOf(_tokenId) == msg.sender);

    transferFrom(_from, _to, _tokenId);

  }
    
  function getOwnerOf(uint256 _tokenId) public view returns(address) {
      return ownerOf(_tokenId);
  }
    
  function getBalanceOf(address _account) public view returns(uint256 tokenAmount) {
      return tokenAmount = balanceOf(_account);
  }
    
    
  function exchangeStars(uint256 _token1, address _token2Owner, uint256 _token2, address _token1Owner ) public {
    require(ownerOf(_token1) == _token1Owner, "recipient1 must be the owner of token1");
    require(ownerOf(_token2) == _token2Owner, "recipient2 must be the owner of token2");
    transferFrom(_token1Owner, _token2Owner, _token1);
    transferFrom(_token2Owner, _token1Owner, _token2);

  }
    


}





