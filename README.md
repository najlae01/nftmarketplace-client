# Nft Marketplace Website

Links to related repositories:

[Server Side](https://github.com/najlae01/nftmarketplace-server)

[Solidity Contract](https://github.com/najlae01/monsters-collection)

# General Idea Describing the Approach

The **NFT Marketplace** project is about creating a platform where users can mint and manage NFTs. Here's how we approached the build:

## 1. Minting NFTs on the Ethereum Blockchain

- Used a **Solidity** smart contract for minting and managing NFTs.
- Deployed the contract to Ethereum using **Hardhat**.

## 2. Storing NFT Metadata in MongoDB

- After minting, NFT metadata is stored in **MongoDB**.
- Created a **Spring Boot** REST API to interact with MongoDB.

## 3. Angular Frontend

- Built a responsive user interface with **Angular**.
- Allows users to connect MetaMask, mint NFTs, and view details.

## 4. Interaction Between Angular and Spring Boot

- **Angular** communicates with **Spring Boot** via HTTP requests.
- This interaction handles minting NFTs and managing metadata.

## 5. Ethereum Node Integration

- Used **Geth** as an Ethereum node to connect to the blockchain.
- Geth manages blockchain communication and contract execution.
