// SPDX-License-Identifier: MIT

pragma solidity >=0.4.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Notary is ERC721 {

  constructor() ERC721("Star Notary", "STN")  {}

  struct Star {
    string name;
  }

    mapping(uint => Star) public tokenIdToStarInfo;
    mapping(uint => uint) public starsForSale;


    function createStar(string memory name_, uint _tokenId) public {
      Star memory newStar = Star({ name: name_});
      tokenIdToStarInfo[_tokenId] = newStar;
      _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint _tokenId, uint price_, address payable _to) public {
        require(_tokenId > 0, "tokenId must not be zero");
        require(price_ > 0, "token price must not be zero");
      require(ownerOf(_tokenId) == msg.sender, "Only token owner can put up token for sell");
    
      approve(payable(_to), _tokenId);
      starsForSale[_tokenId] = price_;


    }
    
    function getStarInfo(uint _tokenId) public view returns(string memory starName) {
        return starName = tokenIdToStarInfo[_tokenId].name;
        
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


}