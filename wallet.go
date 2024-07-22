package main

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"

	"github.com/decred/dcrd/dcrec/secp256k1/v4"
	"github.com/decred/dcrd/dcrec/secp256k1/v4/schnorr"
)

// Wallet represents a cryptocurrency wallet
type Wallet struct {
	PrivateKey *secp256k1.PrivateKey
	PublicKey  *secp256k1.PublicKey
	Balance    int
}

// InitializeWallets initializes multiple wallets with random keys
func InitializeWallets(numWallets int) []*Wallet {
	var wallets []*Wallet
	for i := 0; i < numWallets; i++ {
		privateKey, err := secp256k1.GeneratePrivateKey()
		if err != nil {
			fmt.Println("Error generating private key:", err)
			continue
		}
		wallets = append(wallets, &Wallet{
			PrivateKey: privateKey,
			PublicKey:  privateKey.PubKey(),
			Balance:    100, // Initialize with 100 coins
		})
	}
	return wallets
}

// CalculateTransactionHash calculates the hash of the transaction
func CalculateTransactionHash(transaction Transaction) [32]byte {
	record := transaction.Sender + transaction.Receiver + fmt.Sprint(transaction.Amount) + transaction.Timestamp
	h := sha256.New()
	h.Write([]byte(record))
	var hash [32]byte
	copy(hash[:], h.Sum(nil))
	return hash
}

// SignTransaction signs a transaction with the wallet's private key
func SignTransaction(privateKey *secp256k1.PrivateKey, transaction Transaction) (string, error) {
	hash := CalculateTransactionHash(transaction)
	sig, err := schnorr.Sign(privateKey, hash[:]) // Hash needs to be a 32-byte array
	if err != nil {
		return "", fmt.Errorf("signing failed: %w", err)
	}
	return hex.EncodeToString(sig.Serialize()), nil
}

// VerifyTransaction verifies the transaction signature
func VerifyTransaction(publicKey *secp256k1.PublicKey, transaction Transaction) (bool, error) {
	hash := CalculateTransactionHash(transaction)
	signatureBytes, err := hex.DecodeString(transaction.Signature)
	if err != nil {
		return false, err
	}
	sig, err := schnorr.ParseSignature(signatureBytes)
	if err != nil {
		return false, err
	}
	return sig.Verify(hash[:], publicKey), nil
}

// TransferRequest processes the transfer between sender and receiver
func ProcessTransfer(sender, receiver *Wallet, amount int) error {
	if sender.Balance < amount {
		return errors.New("insufficient funds")
	}
	sender.Balance -= amount
	receiver.Balance += amount
	return nil
}
