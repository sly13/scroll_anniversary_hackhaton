// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract ScrollAnniversaryNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public tokenCounter;
    string public tokenURI;
    uint256 public mintPrice; // Variable to store the price for minting

    constructor(string memory _tokenURI) ERC721("Scroll 1st Anniversary", "S1A") Ownable(msg.sender){
        tokenCounter = 0;
        tokenURI = _tokenURI; // Set the token URI from the constructor
        mintPrice = 0.00025 ether; // Set the mint price to 0.00025 ETH
    }

    // Function to mint NFT
    function mint() public payable {
        require(msg.value >= mintPrice, "Insufficient funds sent for minting"); // Check if enough Ether is sent

        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); // Set token URI
        tokenCounter++;
    }

    // Function to withdraw funds (optional)
    function withdraw() external onlyOwner nonReentrant {
        payable(msg.sender).transfer(address(this).balance);
    }
}
