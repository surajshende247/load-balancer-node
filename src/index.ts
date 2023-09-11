import express, { Request, Response } from "express";
import createServer from "./server";

const mainServer = express();

const PORT = 5000;

const SERVERS_CONFIG = [
  {
    port: 5001,
    name: "server-1",
    requestCount: 0,
  },
  {
    port: 5002,
    name: "server-2",
    requestCount: 0,
  },
  {
    port: 5003,
    name: "server-3",
    requestCount: 0,
  },
  {
    port: 5004,
    name: "server-4",
    requestCount: 0,
  },
];

const servers:any = SERVERS_CONFIG.map((serverConfig) => {
  return createServer(serverConfig.port, serverConfig.name);
});

mainServer.get("/stats", (req: Request, res: Response) => {
  res.json(SERVERS_CONFIG);
});

// ignore favicon requests
mainServer.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204);
});

/*
  ### Core logic of the load balancer:
  1. Keep track of the number of requests sent to main server.
  2. Find the next server using the round robin.
  3. Send the request to the next server.
*/

let requestCount = 0;

mainServer.use((req: Request, res: Response) => {
  console.info(`Request received: ${req.method} ${req.url}`);
  requestCount = (requestCount + 1) % servers.length;
  console.log(`Request sent to ${SERVERS_CONFIG[requestCount].name}`);
  res.setHeader("X-Server", `server-${requestCount}`);
  SERVERS_CONFIG[requestCount].requestCount += 1;
  servers[requestCount](req, res);
});

mainServer.listen(PORT, () => {
  console.log(`Main server listening on port ${PORT}`);
});
