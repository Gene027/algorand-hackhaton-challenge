# Next.js Algorand Wallet App

## Overview

This is a Next.js application that enables users to connect to the Algorand blockchain using the Pera Wallet. The application allows users to connect their wallet, donate ALGO, and opt into listed assets on both Algorand testnet and mainnet. By default, the application operates on the testnet environment.

## Features

- **Pera Wallet Integration**: Connect to Algorand blockchain via Pera Wallet (mobile app).
- **Support for Donations**: Donate 1 ALGO to the app owner by clicking a button and confirming the transaction.
- **Opt-in to Assets**: Users can opt into listed assets on both the Algorand mainnet and testnet networks.

## Prerequisites

- **Node.js** and **Yarn** must be installed on your machine.
- Install the **Pera Wallet** on your mobile device to interact with the application.

## Getting Started

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   git checkout praise-pera-solution
   ```

2. Install the dependencies:
   ```bash
   yarn install
   ```

### Running the Application

To start the development server:

```bash
yarn dev
```

By default, the app will be available on [http://localhost:3000](http://localhost:3000).

## Usage

### Connecting with Pera Wallet

1. Launch the application in your browser.
2. Click on the **"Connect with Pera"** button.
3. Open the Pera Wallet app on your mobile device, scan the displayed QR code, and connect your wallet.

_Note: Users must connect their wallet before accessing other features of the application._

### Donating 1 ALGO

- Once connected, you can support the app by clicking the **"Donate 1 ALGO"** button.
- You will be prompted to sign the transaction in the Pera Wallet app to complete the donation.

### Opting into Assets

- The application lists assets available on both testnet and mainnet depending on the current user's network selection.
- Users can opt into an asset by clicking on it and signing the transaction on their Pera Wallet app.

## Network Configuration

- **Default Network**: The application operates on the Algorand testnet by default.
- You can switch to the mainnet if needed through the user interface navbar.

## Commands Summary

- **Install dependencies**: `yarn install`
- **Run development server**: `yarn dev`
