const express = require("express");
const routers = require("./src/routes/pessoa.js");
const { exec } = require("child_process");

const app = express();

app.use(express.json());

app.use(routers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  
 /* exec("shutdown /s /t 0", (error) => {
    if (error) {
      console.error("Erro ao inicializar:", error);
    }
  });*/

  console.log(`Servidor rodando na porta ${PORT}`);
});
