//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.7;
//Using OpenZeppelin library
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import '@openzeppelin/contracts/access/Ownable.sol'; // this allows us to define fns only owner can use

contract WaifuPunkNFTs is ERC721, Ownable{
    //Deployer is the owner

    //There is another option ERC721a which is gas efficient for minting multiple NFTs  
    
    uint256 public mintPrice; //price to mint an NFT
    uint256 public totalSupply; // total number of NFTs minted
    uint256 public maxSupply;  // we'll set a limit to max number of NFTs mintable
    uint256 public maxPerWallet; //we'll set a limit to max number of NFTs mintable by each account
    bool public isPublicMintEnabled; //determines when users can mint 
    string internal baseTokenURI; //used to determine which URL to use to find image location
    address payable public withdrawWallet; //address to withdraw money that goes into contract
    mapping(address=>uint256) public walletMints; //track how many NFTs a wallet minted

    //Initializing inside constructor has some gas relief

    //tokenURI is an unique identifier of what the token looks like     
    //token metadata has an attribute image: which points to an URI of what the image looks like    


    constructor()payable ERC721('WaifuPunks', 'WP') {
        //ERC721 takes two args, name and symbol
        mintPrice=0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //will set withdraw wallet address
        //withdrawWallet = 0x....;

    } 

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)external onlyOwner{
        isPublicMintEnabled=_isPublicMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner{
        //calldata as string will just be read
        baseTokenURI=_baseTokenURI; // basetokenuri is an URL were images will be located
    }

    function tokenURI(uint256 _tokenId)public view override returns(string memory){
        //tokenURI is an ERC721 interface function that is called by Opensea and likes
        //By setting our basetokenURI there can be a conflict while function call
        //hence we use override
        require(_exists(_tokenId), 'Token doesnt exist!' );
        return string(abi.encodePacked(baseTokenURI, Strings.toString(_tokenId),".json"));
        //Opensea calls TokenURI and is handed over this packed response containing basetokenURI and tokenID
    }

    function withdraw()external onlyOwner{
        (bool success, ) = withdrawWallet.call{value :address(this).balance}('');
        //calling wallet address with contract balance for transfer
        require(success,'Withdrawal Failed!');
    }    

    function mint(uint256 _quantity)public payable{
        require(isPublicMintEnabled,'Minting not enabled');
        require(msg.value == _quantity * mintPrice, 'Wrong mint value');
        require(_quantity + totalSupply <= maxSupply,'Sold Out');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Exceeded max per wallet'  );


        for(uint256 i = 0; i < _quantity; i++){
            uint256 newTokenId=totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender,newTokenId);
            //_safeMint is an ERC721 function that takes address of NFT receiver,  with a token id
            //storage variable effect should happen before an interaction to prevent Re-entrancing attack
        }
    }

}


