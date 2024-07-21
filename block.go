package main

import (
	"crypto/sha256"
	"encoding/hex"
	"time"
)

type Block struct {
	Index        int
	Timestamp    string
	Data         string
	PreviousHash string
	Hash         string
}

// CalculateHash returns the hash of the block's data
func CalculateHash(block Block) string {
	record := string(block.Index) + block.Timestamp + block.Data + block.PreviousHash
	hash := sha256.New()
	hash.Write([]byte(record))
	hashed := hash.Sum(nil)
	return hex.EncodeToString(hashed)
}

// CreateBlock create a new block using the previous block's hash
func CreateBlock(previousBlocl Block, data string) Block {
	newBlock := Block{
		Index:        previousBlocl.Index + 1,
		Timestamp:    time.November.String(),
		Data:         data,
		PreviousHash: previousBlocl.Hash,
		Hash:         "",
	}
	newBlock.Hash = CalculateHash(newBlock)
	return newBlock
}
