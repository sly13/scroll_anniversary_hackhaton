// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; // Import Strings utility

// startBlock= 10000000; ~Wed Oct 09 2024 08:33:41

contract ScrollTestNft is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public tokenCounter;
    uint256 public mintPrice; // Variable to store the price for minting
    string public baseTokenURI; // Base URI for token metadata

    // Set default values
    uint256 private constant _mintPrice = 0.0000025 ether; // Default mint price in Ether

    // Constructor accepting only the base token URI
    constructor(string memory _baseTokenURI) 
        ERC721("Scroll Test Nft", "STN") // Set name and symbol directly in the constructor
        Ownable(msg.sender)
    {
        tokenCounter = 0;
        baseTokenURI = _baseTokenURI; // Set the base token URI
        mintPrice = _mintPrice; // Set the mint price from the constant
    }

    // Function to mint NFT
    function mint() public payable {
        require(msg.value >= mintPrice, "Insufficient funds sent for minting"); // Check if enough Ether is sent

        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);

        // Set the token URI for the newly minted token
        _setTokenURI(newItemId, string(abi.encodePacked(baseTokenURI, "/", Strings.toString(newItemId))));
        tokenCounter++;
    }

    // Function to withdraw funds (optional)
    function withdraw() external onlyOwner nonReentrant {
        payable(msg.sender).transfer(address(this).balance);
    }
}
