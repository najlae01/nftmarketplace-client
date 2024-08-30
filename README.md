# NFT Marketplace Angular Project - Client Side

This Angular project serves as the client-side application for the NFT Marketplace. It interacts with the REST API provided by the Spring Boot server and communicates with a Solidity smart contract to enable users to mint, manage, and view NFTs.

Links to related repositories:

[Server Side](https://github.com/najlae01/nftmarketplace-server)

[Solidity Contract](https://github.com/najlae01/monsters-collection)

## General Idea Describing the Approach

The **NFT Marketplace** project is about creating a platform where users can mint and manage NFTs. Here's how we approached the build:

### 1. Minting NFTs on the Ethereum Blockchain

- Used a **Solidity** smart contract for minting and managing NFTs.
- Deployed the contract to Ethereum using **Hardhat**.

### 2. Storing NFT Metadata in MongoDB

- After minting, NFT metadata is stored in **MongoDB**.
- Created a **Spring Boot** REST API to interact with MongoDB.

### 3. Angular Frontend

- Built a responsive user interface with **Angular**.
- Allows users to connect MetaMask, mint NFTs, and view details.

### 4. Interaction Between Angular and Spring Boot

- **Angular** communicates with **Spring Boot** via HTTP requests.
- This interaction handles minting NFTs and managing metadata.

### 5. Ethereum Node Integration

- Used **Geth** as an Ethereum node to connect to the blockchain.
- Geth manages blockchain communication and contract execution.

## Project Setup & Structure

### 1. Setting Up the Angular Project

- **Framework**: Angular is used for building the user interface and interacting with the backend services.
- **Styling**: Classic CSS and the PrimeNG library are used for styling the pages.
- **Pages**:
  - **Home Page**: The landing page where users can connect their MetaMask wallet.
  - **Minting Page**: Allows users to mint new NFTs and store their metadata in MongoDB.
  - **User NFTs Page**: Displays the NFTs owned by the authenticated user (in development).

### 2. Wallet Connection

- **MetaMask Integration**:
  - Users can connect their MetaMask wallet via the home page.
  - If MetaMask is not installed, users are prompted to install it.
  - Upon connection, the user's MetaMask account ID is stored in local storage to manage routing and component rendering based on user state.

## Interacting with Solidity Contract & REST APIs

### 1. Solidity Contract Interaction

- **Web3.js Integration**:
  - Install `web3.js` in the Angular project:
    ```shell
    npm install web3
    ```
  - Create a `contract.service.ts` file and import `web3.js`.
  - **ABI Handling**:
    - Use Remix IDE to retrieve the ABI from the Solidity contract.
    - Store the ABI in an `abi.js` file within the Angular project.
  - **Contract Interaction**:
    - Connect to the Ethereum network where the contract is deployed.
    - Create a contract instance using `web3.js` and call contract functions like `mint`.

### 2. REST API Interaction

- **REST API Integration**:
  - Use Angular's `HttpClient` module in `nft.service.ts` to interact with the REST API provided by the Spring Boot server.
  - Implement GET, POST, PUT, and DELETE requests to manage NFT data, such as uploading images, minting NFTs, and saving NFT metadata to MongoDB.

## Running the Project

### 1. Install Dependencies

First, install the project dependencies by running:

```shell
npm install
```

### 2. Start the Development Server

After installing the dependencies, start the Angular development server with:

```shell
ng serve
```

This command will start the server and open the application in your browser.
