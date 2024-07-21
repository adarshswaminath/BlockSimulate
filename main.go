package main

import (
	"fmt"
	"time"
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

	// newBlock := CreateBlock(genesisBlock, "second Block")
	// blockchain = append(blockchain, newBlock)

	// newBlock1 := CreateBlock(newBlock, "second Block")
	// blockchain = append(blockchain, newBlock1)

	for {
		previousBlock := blockchain[len(blockchain)-1]
		newData := fmt.Sprintf("Block #%d", previousBlock.Index+1)
		newBlock := CreateBlock(previousBlock, newData)

		blockchain = append(blockchain, newBlock)
		fmt.Println(blockchain)

		// Print the new block
		// fmt.Printf("Index: %d\n", newBlock.Index)
		// fmt.Printf("Timestamp: %s\n", newBlock.Timestamp)
		// fmt.Printf("Data: %s\n", newBlock.Data)
		// fmt.Printf("PreviousHash: %s\n", newBlock.PreviousHash)
		// fmt.Printf("Hash: %s\n\n", newBlock.Hash)

		// Sleep for a while to simulate time between block creation
		time.Sleep(2 * time.Second)
	}

}
