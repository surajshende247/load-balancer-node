# Load Balancer Node ⚖️

This project is a simple load balancer implemented in TypeScript using the Express.js framework. The goal of the load balancer is to evenly distribute incoming HTTP requests to multiple backend servers and provide basic statistics about these servers.

## Project Structure

The project is organized into two main files:

### `src/index.ts`

This is the entry point of the application and contains the logic for the main server and load balancing. Here's a brief overview of its key components:

- **Main Server**: An Express.js server is created to handle incoming requests.
- **Server Configuration**: An array `SERVERS_CONFIG` is defined, containing information about the backend servers, including their ports, names, and request counts.
- **Backend Servers**: Backend servers are created and stored in an array `servers` based on the configuration provided.
- **Statistics Endpoint**: A `/stats` endpoint is defined to retrieve server statistics.
- **Favicon Handling**: Requests for `favicon.ico` are ignored with a 204 status response.
- **Load Balancing Logic**: Incoming requests are load balanced among the backend servers using a round-robin approach.
- **Request Count Tracking**: The load balancer keeps track of the number of requests sent to the main server.

### `src/server.ts`

This file defines the creation of individual backend servers. Each backend server is an Express.js application with its own routes for health checks and ping functionality. The `createServer` function sets up these routes and starts the server.

## Load Balancing Logic

The core logic of the load balancer follows these steps:

1. It keeps track of the number of requests received by the main server.
2. It uses round-robin to select the next backend server.
3. It sends the incoming request to the selected backend server.


## Endpoints

- `/stats`: Retrieves statistics about the backend servers.
- `/favicon.ico`: Ignores requests for favicon.

For each backend server (e.g., "server-1", "server-2"), the following endpoints are available:

- `/health`: Provides the health status of the server.
- `/ping` (GET): Responds with a "pong" message.
- `/ping` (POST): Accepts and logs ping messages.

## Usage

This load balancer is a basic implementation for educational purposes. It can be extended and enhanced to include features like load balancing algorithms, health checks, and more robust error handling depending on the specific requirements of your application.
