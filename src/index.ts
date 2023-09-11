import express from "express";
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

let requestCount = 0;

mainServer.use((req, res) => {
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
