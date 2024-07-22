package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

// Block represents a single block in the blockchain
type Block struct {
	Index        int
	Timestamp    string
	Data         string
	PreviousHash string
	Hash         string
}

// CalculateHash calculates the hash of a block
func CalculateHash(block Block) string {
	record := fmt.Sprintf("%d%s%s%s", block.Index, block.Timestamp, block.Data, block.PreviousHash)
	h := sha256.New()
	h.Write([]byte(record))
	return hex.EncodeToString(h.Sum(nil))
}

// CreateBlock creates a new block in the blockchain
func CreateBlock(previousBlock Block, data string) Block {
	newIndex := previousBlock.Index + 1
	timestamp := time.Now().String()
	return Block{
		Index:        newIndex,
		Timestamp:    timestamp,
		Data:         data,
		PreviousHash: previousBlock.Hash,
		Hash:         CalculateHash(Block{Index: newIndex, Timestamp: timestamp, Data: data, PreviousHash: previousBlock.Hash}),
	}
}
