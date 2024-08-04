package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/decred/dcrd/dcrec/secp256k1/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// Global variable to store transactions
var transactions []Transaction

type TransferRequest struct {
	SenderPublicKey   string `json:"sender_public_key"`
	SenderPrivateKey  string `json:"sender_private_key"`
	ReceiverPublicKey string `json:"receiver_public_key"`
	Amount            int    `json:"amount"`
}

type Transaction struct {
	Sender    string
	Receiver  string
	Amount    int
	Signature string
	Timestamp string
}

func main() {
	genesisBlock := Block{
		Index:        0,
		Timestamp:    time.Now().String(),
		Data:         "Genesis Block",
		PreviousHash: "",
		Hash:         "",
	}

	genesisBlock.Hash = CalculateHash(genesisBlock)
	blockchain := []Block{genesisBlock}

	// Initialize Wallets
	numWallets := 5
	wallets := InitializeWallets(numWallets)

	for i, wallet := range wallets {
		fmt.Printf("Wallet %d\n", i+1)
		fmt.Printf("Public Key: %x\n", wallet.PublicKey.SerializeCompressed())
		fmt.Printf("Private Key: %x\n", wallet.PrivateKey.Serialize())
		fmt.Printf("Balance: %d\n\n", wallet.Balance)
	}

	// Fiber setup
	app := fiber.New()
	// Initialize default cors setup
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	go func() {
		for {
			previousBlock := blockchain[len(blockchain)-1]
			hasher := sha256.New()
			hasher.Write([]byte(fmt.Sprintf("Block #%d", previousBlock.Index+1))) // write string bytes to hasher
			result := hasher.Sum(nil)                                             // Get the hash as a byte slice
			newData := hex.EncodeToString(result)                                 // Convert to hex string
			// newData := fmt.Sprintf("Block #%d", previousBlock.Index+1)
			newBlock := CreateBlock(previousBlock, newData)
			blockchain = append(blockchain, newBlock)
			time.Sleep(10 * time.Second)
		}
	}()

	// API endpoints
	app.Get("/block-data", func(c *fiber.Ctx) error {
		return c.JSON(blockchain)
	})

	app.Get("/latest-block", func(c *fiber.Ctx) error {
		return c.JSON(blockchain[len(blockchain)-1])
	})

	app.Get("/wallets", func(c *fiber.Ctx) error {
		return c.JSON(wallets)
	})

	// Endpoint to create a new wallet
	app.Post("/create-wallet", func(c *fiber.Ctx) error {
		wallet, err := CreateWallet()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to create wallet: " + err.Error(),
			})
		}
		wallets = append(wallets, wallet)
		return c.JSON(fiber.Map{
			"public_key":  hex.EncodeToString(wallet.PublicKey.SerializeCompressed()),
			"private_key": hex.EncodeToString(wallet.PrivateKey.Serialize()),
			"balance":     wallet.Balance,
		})
	})

	// Endpoint to transfer funds
	app.Post("/transfer", func(c *fiber.Ctx) error {
		var req TransferRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "cannot parse request",
			})
		}

		var sender, receiver *Wallet
		var senderPrivateKey *secp256k1.PrivateKey
		for _, wallet := range wallets {
			if hex.EncodeToString(wallet.PublicKey.SerializeCompressed()) == req.SenderPublicKey {
				sender = wallet

				// Convert the sender's private key from hex string to *secp256k1.PrivateKey
				privateKeyBytes, err := hex.DecodeString(req.SenderPrivateKey)
				if err != nil {
					return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
						"error": "invalid sender private key",
					})
				}
				privateKey := secp256k1.PrivKeyFromBytes(privateKeyBytes)
				senderPrivateKey = privateKey
			}
			if hex.EncodeToString(wallet.PublicKey.SerializeCompressed()) == req.ReceiverPublicKey {
				receiver = wallet
			}
		}

		if sender == nil || receiver == nil || senderPrivateKey == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid sender or receiver public key",
			})
		}

		tx := Transaction{
			Sender:    req.SenderPublicKey,
			Receiver:  req.ReceiverPublicKey,
			Amount:    req.Amount,
			Timestamp: time.Now().String(),
		}

		// Sign the transaction
		signature, err := SignTransaction(senderPrivateKey, tx)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to sign transaction: " + err.Error(),
			})
		}
		tx.Signature = signature

		// Verify the transaction
		valid, err := VerifyTransaction(sender.PublicKey, tx)
		if err != nil || !valid {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid transaction signature",
			})
		}

		// Process the transfer
		err = ProcessTransfer(sender, receiver, req.Amount)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		// Store the transaction
		transactions = append(transactions, tx)

		return c.JSON(tx)
	})

	// Endpoint to get account details
	app.Get("/account-details/:public_key", func(c *fiber.Ctx) error {
		publicKeyHex := c.Params("public_key")
		var wallet *Wallet
		for _, w := range wallets {
			if hex.EncodeToString(w.PublicKey.SerializeCompressed()) == publicKeyHex {
				wallet = w
				break
			}
		}
		if wallet == nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "wallet not found",
			})
		}

		// Return public key and balance, but not private key
		return c.JSON(fiber.Map{
			"public_key": hex.EncodeToString(wallet.PublicKey.SerializeCompressed()),
			"balance":    wallet.Balance,
		})
	})

	// Endpoint to get all transactions
	app.Get("/transactions", func(c *fiber.Ctx) error {
		return c.JSON(transactions)
	})

	// Port setup for railway deployement
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}
