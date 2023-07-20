import express from "express";
import { router } from "./src/routes";
import cors from 'cors';

const server = express();

server.use(express.json({
    type: ['application/json'],
  }))
server.use(cors())
server.use(router);

server.listen(8080, async () => {
    console.log('Servidor escutando na porta ' + 8080)
});