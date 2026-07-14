require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   TRANSPORTER GMAIL
========================= */

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Puerto 587 usa STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* =========================
   HOME
========================= */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Liona Jewels API funcionando 💎"
    });

});

/* =========================
   HEALTH
========================= */

app.get("/health", (req, res) => {

    res.json({
        status: "online",
        uptime: process.uptime()
    });

});

/* =========================
   PEDIDO
========================= */

app.post("/pedido", async (req, res) => {

    try {

        const { cliente, productos, total } = req.body;
        if (!cliente || !productos || productos.length === 0) {
    return res.status(400).json({
        success: false,
        message: "Pedido incompleto."
    });
}

        let htmlProductos = "";

        productos.forEach(producto => {

            htmlProductos += `
                <tr>

                    <td style="padding:12px;border-bottom:1px solid #eee;">
                        <strong>${producto.name}</strong>
                    </td>

                    <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;">
                        ${producto.price} €
                    </td>
                </tr>
            `;

        });
    const numeroPedido = Math.floor(Date.now() / 1000);
        const html = `
        <div style="font-family:Arial;padding:30px;max-width:700px;">

            <h1 style="color:#111;">
                💎 Nuevo pedido - Liona Jewels
            </h1>

            <h2>Cliente</h2>

            <p>
                <strong>Nombre:</strong>
                ${cliente.nombre}
            </p>

            <p>
                <strong>Email:</strong>
                ${cliente.email}
            </p>

            <p>
                <strong>Dirección:</strong>
                ${cliente.direccion}
            </p>

            <p>
                <strong>Código Postal:</strong>
                ${cliente.cp}
            </p>

            <p>
                <strong>Ciudad:</strong>
                ${cliente.ciudad}
            </p>

            <p>
                <strong>Provincia:</strong>
                ${cliente.provincia}
            </p>

            <p>
                <strong>Notas:</strong>
                ${cliente.notas || "-"}
            </p>

            <hr>

            <h2>Productos</h2>

            <table style="width:100%;border-collapse:collapse;">
                ${htmlProductos}
            </table>

            <h2 style="margin-top:30px;">
                Total: ${total} €
            </h2>

        </div>
        `;

        await transporter.sendMail({

            from: `"Liona Jewels" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            subject: `💎 Pedido ${numeroPedido} - ${cliente.nombre}`,

            html

        });

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "No se pudo enviar el pedido."
        });

    }

});

/* =========================
   404
========================= */

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Ruta no encontrada"
    });

});

/* =========================
   START
========================= */
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Faltan EMAIL_USER o EMAIL_PASS en .env");
    process.exit(1);
}
app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("💎 LIONA JEWELS SERVER");
    console.log("================================");
    console.log(`Servidor: http://localhost:${PORT}`);
    console.log("");

});