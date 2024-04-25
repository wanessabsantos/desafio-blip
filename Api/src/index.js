import express from "express";
import { desafioHandler } from "./desafio.js";

const app = express();

const port = process.env.PORT || 4000;

app.get("/repositories", desafioHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
