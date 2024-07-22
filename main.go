package main

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func main() {

	genesisBlock := Block{
		Index:        0,
		Timestamp:    time.November.String(),
		Data:         "Genesis Block",
		PreviousHash: "",
		Hash:         "",
	}

	genesisBlock.Hash = CalculateHash(genesisBlock)
	blockchain := []Block{genesisBlock}

	// fiber setup
	app := fiber.New()
	go func() {
		for {
			previousBlock := blockchain[len(blockchain)-1]
			newData := fmt.Sprintf("Block #%d", previousBlock.Index+1)
			newBlock := CreateBlock(previousBlock, newData)

			blockchain = append(blockchain, newBlock)
			// Sleep for a while to simulate time between block creation
			time.Sleep(2 * time.Second)
		}
	}()

	// API endpoints
	app.Get("/block-data", func(c *fiber.Ctx) error {
		return c.JSON(blockchain)
	})

	app.Get("/latest-block", func(c *fiber.Ctx) error {
		return c.JSON(blockchain[len(blockchain)-1])
	})

	app.Listen(":3000")

}
