const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

app.post("/pedido", async (req, res) => {

    try {

        const pedido = req.body;

        let html = `
            <h1>Nuevo pedido - Liona Jewels</h1>

            <h2>Cliente</h2>

            <p><strong>Nombre:</strong> ${pedido.cliente.nombre}</p>

            <p><strong>Email:</strong> ${pedido.cliente.email}</p>

            <p><strong>Dirección:</strong> ${pedido.cliente.direccion}</p>

            <hr>

            <h2>Productos</h2>
        `;

        pedido.productos.forEach(producto => {

            html += `

                <p>

                    ${producto.name}

                    - ${producto.price}€

                </p>

            `;

        });

        html += `<h2>Total: ${pedido.total}€</h2>`;

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "Nuevo pedido - Liona Jewels",

            html

        });

        res.json({

            success: true

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

});

app.listen(3000, () => {

    console.log("Servidor iniciado en puerto 3000");

});
