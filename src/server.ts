import express from "express";
import { getHealth, getPing, postPing } from "./controllers/main";

const createServer = (port: Number, name: String) => {
  const newServer = express();

  // Routes setup
  newServer.get("/health", getHealth);
  newServer.get("/ping", getPing);
  newServer.post("/ping", postPing);

  newServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return newServer;
};

export default createServer;
