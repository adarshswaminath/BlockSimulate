# BlockSimulate

BlockSimulate is a simple blockchain simulator written in Go. It creates a local blockchain with features for wallet management, transaction signing, and blockchain operations.

## Features

* Create and manage wallets
* Transfer funds between wallets
* Sign and verify transactions
* Retrieve blockchain data and transaction history

## Getting Started

### Prerequisites

* Go 1.21 or higher: https://golang.org/dl/

### Installation

1. Clone the repository:

```sh
git clone https://github.com/adarshswaminath/BlockSimulate.git
```

2.Navigate to the project directory:

```sh
cd BlockSimulate
```

3.Install dependencies:

```sh
go mod tidy
```


### Usage
You can run the application in two ways:

1. Running with go run
```sh
go run main.go wallet.go block.go
```

2. Building and running the binary
```sh
go build -o blocksimulate
```
3.Run the binary:

```sh
./blocksimulate
```


The application will start a web server on http://localhost:3000.

## API Endpoints

- GET `/block-data`: Retrieve all blocks in the blockchain.
- GET `/latest-block`: Retrieve the latest block in the blockchain.
- GET `/wallets`: Retrieve all wallets.
- POST `/create-wallet`: Create a new wallet. Responds with the public and private keys and initial balance.
- POST `/transfer`: Transfer funds between wallets.
Request body:
```json
{
  "sender_public_key": "Sender's public key",
  "sender_private_key": "Sender's private key",
  "receiver_public_key": "Receiver's public key",
  "amount": 10
}
```
- GET `/account-details/`:public_key: Retrieve account details by public key.
- GET `/transactions`: Retrieve all transactions.