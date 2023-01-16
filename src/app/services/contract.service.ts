import { Injectable } from '@angular/core';
import { AbiItem } from 'web3-utils'
import Web3 from "web3";
import abi from'../models/abi';
import { NFT } from '../models/nft';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  // The address of the smart contract
  contractAddress = '0x00C4577b1a0Ad14f1e2687bd2787CbC23E9C2488';

  // The ABI (Application Binary Interface) of the smart contract
  contractABI = abi;

  contract


  constructor() { 

      this.web3.eth.setProvider(Web3.givenProvider);
        // Create an instance of the smart contract
      this.contract = new this.web3.eth.Contract(this.contractABI as AbiItem[], this.contractAddress);
  }


mintNFT(nft: NFT, image: any){

    // Prepare the data for the transaction
    const data = this.contract.methods.mint(nft.name, nft.description, image, nft.price).encodeABI();

    var userId = localStorage.getItem("accountId");

    var userIdString = userId?.toString()

      // Prepare the transaction object
    const tx = {
      from: userIdString, // Address of the sender
      to: this.contractAddress, // Address of the smart contract
      data: data, // Encoded data for the function call
      gas: 2000000 // Gas limit for the transaction
    };

    var nftTokenId: any

    // Send the transaction
    this.web3.eth.sendTransaction(tx)
    .then((result : any) => {
      // The result object will contain the tokenId
      const tokenId = data
      //you can now store this tokenId in a variable
      nftTokenId = tokenId

    }).catch((error) => {
        console.error(error);
    });
  return nftTokenId;
}

  getOwner(tokenId: any){
      // Retrieve the owner of the nft
      this.contract.methods.tokenIdToOwnerOf(tokenId).call((ownerTokenId : any) => {
      // The result object will contain the owner Id
      console.log(`Token URI: ${ownerTokenId}`);
      return ownerTokenId

    }).catch((error: any) => {
        console.error(error);
    });
  }


}
