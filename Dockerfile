# Use the official Golang image as the base image
FROM golang:1.21.1-alpine


# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files first to take advantage of Docker's caching
COPY go.mod go.sum ./

# Download and cache Go modules
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o blocksimulate

# Expose the port on which the application will run
EXPOSE 3000

# Command to run the application
CMD ["./blocksimulate"]
