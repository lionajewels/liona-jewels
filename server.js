require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Liona Jewels API funcionando 💎"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    uptime: process.uptime()
  });
});

app.post("/pedido", (req, res) => {
  console.log("Nuevo pedido recibido:");
  console.log(req.body);

  res.json({
    success: true,
    message: "Pedido recibido correctamente"
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

app.listen(PORT, () => {
  console.log("================================");
  console.log("💎 LIONA JEWELS SERVER");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log("================================");
});