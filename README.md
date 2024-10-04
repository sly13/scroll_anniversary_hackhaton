# Scroll Anniversary Celebration 🎉 - Level Up Mini Hack by Scroll & Alchemy

This project was created as part of the **Level Up Mini Hack** by Scroll and Alchemy to celebrate Scroll's mainnet anniversary. The goal is to provide users with an exciting and interactive experience by minting a special NFT that grants access to a game where players collect badges and avoid bombs. A leaderboard adds a competitive edge, tracking top performers. The project leverages Alchemy for both frontend interactions and smart contract deployment.

---

## Table of Contents

- [Scroll Anniversary Celebration 🎉 - Level Up Mini Hack by Scroll \& Alchemy](#scroll-anniversary-celebration----level-up-mini-hack-by-scroll--alchemy)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Main Components](#main-components)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Smart Contract](#smart-contract)
  - [Features](#features)
  - [Contract Details](#contract-details)
  - [Setup and Installation](#setup-and-installation)
    - [Backend (Nest.js)](#backend-nestjs)
    - [Frontend (Next.js)](#frontend-nextjs)
  - [Game Instructions](#game-instructions)
  - [Leaderboards](#leaderboards)
  - [Acknowledgments](#acknowledgments)
  - [Demo](#demo)

---

## Project Overview

The **Scroll Anniversary Celebration** project is a Web3 game where users mint a commemorative NFT that grants them access to an engaging browser-based game. The game revolves around collecting badges while avoiding bombs, with a leaderboard showcasing top players based on their performance.

---

## Main Components

1. **NFT Minting**: Users mint an NFT on the Sepolia Scroll network via Alchemy, which grants them access to the game.
2. **Game**: A fun, browser-based game where players collect badges and avoid bombs.
3. **Leaderboard**: A real-time leaderboard that tracks the top players based on their scores.

---

## Tech Stack

### Backend

- **Nest.js**: Handles the backend API and game logic.
- **Prisma**: Manages the database and ORM functionality.
- **PostgreSQL**: Stores user data and game statistics.

### Frontend

- **Next.js**: Builds the game interface and user interactions.
- **React.js**: Manages state and rendering of game components.
- **Alchemy**: Interacts with the blockchain from the frontend.
- **Wagmi**: Manages wallet connections and interactions.
- **Phaser**: Implements the game mechanics and animations.

### Smart Contract

- **Solidity**: Used to create the smart contract for minting NFTs and managing game access.
- **Hardhat**: Facilitates smart contract development and deployment.
- **Alchemy**: Provides the infrastructure for deploying the smart contract on the Sepolia Scroll network.

---

## Features

- **NFT Minting**: Users can mint a unique NFT to commemorate Scroll's anniversary.
- **Game Access**: Minting the NFT unlocks access to the browser-based game.
- **Badge Collection**: Players collect badges to earn points while avoiding bombs.
- **Leaderboard**: The top players are ranked based on their performance in the game.

---

## Contract Details

To compile and deploy the smart contract on the Sepolia Scroll network:

1. Navigate to the contract directory:
   ```bash
   cd contract
   ```
2. Compile the contract:
   ```bash
   npx hardhat compile
   ```
3. Deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js --network scrollSepolia
   ```
   Contract Address: `0x70e8d72Fd4f889D21f349EE36D9acEF2629D17C7`  
   Verified Contract: You can view the verified contract on the Sepolia Scroll Explorer.

---

## Setup and Installation

### Backend (Nest.js)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file and add the following environment variables:
   ```plaintext
   FRONTEND_URL=<frontend_url>
   PORT=<backend_port>
   DATABASE_URL=<prisma_connection_to_database>
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env.local` file with the following variables:
   ```plaintext
   NEXT_PUBLIC_ALCHEMY_API_KEY=<your_alchemy_api_key>
   NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed_contract_address>
   NEXT_PUBLIC_BACKEND_URL=<backend_url>
   ```
4. Run the frontend app:
   ```bash
   npm run dev
   ```

---

## Game Instructions

- **Mint the NFT**: Use the dApp to mint the special Scroll anniversary NFT.
- **Access the Game**: The minted NFT grants access to the game.
- **Collect Badges**: In the game, collect falling badges to increase your score while avoiding bombs.
- **Compete**: The more badges you collect, the higher your position on the leaderboard.

---

## Leaderboards

A real-time leaderboard is displayed on the game page, showing the top 10 players by score. The leaderboard updates dynamically as players collect badges and avoid bombs.

---

## Acknowledgments

- **Sepolia Scroll Network**: For providing the blockchain infrastructure for this project.
- **Alchemy**: For powering the frontend and handling smart contract deployment.

---

## Demo

Watch the demo video [here](https://www.youtube.com/watch?v=flMKkqg5ICA).
