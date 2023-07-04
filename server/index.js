const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstackprueba',
});

app.get("/vista1", (req, res) => {
    db.query(`
    SELECT h.fecha, l.nombre AS LineaNombre, tc.nombre AS NombreCliente, h.Consumo, h.Perdida, h.Costo
    FROM HistoricoConsumos h
    JOIN Lineas l ON h.idLinea = l.id
    JOIN Tipo_clientes tc ON h.idTipCliente = tc.id
    WHERE h.fecha >= '2010-01-01' AND h.fecha <= '2010-06-30'
    ORDER BY h.fecha, l.nombre, tc.nombre;
  `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/vista1", (req, res) => {
    const {
        fecha_inicio,
        fecha_final,
    } = req.body;
    console.log(fecha_inicio, fecha_final)
    db.query(`
    SELECT h.fecha, l.nombre AS LineaNombre, tc.nombre AS NombreCliente, h.Consumo, h.Perdida, h.Costo
    FROM HistoricoConsumos h
    JOIN Lineas l ON h.idLinea = l.id
    JOIN Tipo_clientes tc ON h.idTipCliente = tc.id
    WHERE h.fecha >= '${fecha_inicio}' AND h.fecha <= '${fecha_final}'
    ORDER BY h.fecha, l.nombre, tc.nombre;
  `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/vista2", (req, res) => {
    db.query(`
    SELECT
    tc.nombre AS TipoUsuario,
    h.idLinea AS Tramo,
    h.Consumo,
    h.Perdida,
    h.Costo
    FROM
    HistoricoConsumos AS h
    INNER JOIN Tipo_clientes AS tc ON h.idTipCliente = tc.id
    WHERE
    h.fecha >= '2010-01-01' AND h.fecha <= '2010-01-31'
    ORDER BY
    tc.nombre ASC, h.Perdida DESC;
    `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/vista2", (req, res) => {
    const {
        fecha_inicio,
        fecha_final,
    } = req.body;
    console.log(fecha_inicio, fecha_final)
    db.query(`
    SELECT
    tc.nombre AS TipoUsuario,
    h.idLinea AS Tramo,
    h.Consumo,
    h.Perdida,
    h.Costo
    FROM
    HistoricoConsumos AS h
    INNER JOIN Tipo_clientes AS tc ON h.idTipCliente = tc.id
    WHERE
    h.fecha >= '${fecha_inicio}' AND h.fecha <= '${fecha_final}'
    ORDER BY
    tc.nombre ASC, h.Perdida DESC;
    `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/vista3", (req, res) => {
    db.query(`
    SELECT
    pc.linea AS Tramo,
    pc.cliente AS Cliente,
    IFNULL(SUM(CAST(pc.dato AS DECIMAL(20, 10))), 0) AS TotalPerdidas
    FROM
    perdida_por_tramo AS pc
    WHERE
    pc.fecha BETWEEN '2010-01-01' AND '2010-01-31'
    GROUP BY
    pc.linea,
    pc.cliente
    ORDER BY
    TotalPerdidas DESC;
    `,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Ocurrió un error.');
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/vista3", (req, res) => {
    const {
        fecha_inicio,
        fecha_final,
    } = req.body;
    console.log(fecha_inicio, fecha_final)
    db.query(`
    SELECT
    pc.linea AS Tramo,
    pc.cliente AS Cliente,
    IFNULL(SUM(CAST(pc.dato AS DECIMAL(20, 10))), 0) AS TotalPerdidas
    FROM
    perdida_por_tramo AS pc
    WHERE
    pc.fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}'
    GROUP BY
    pc.linea,
    pc.cliente
    ORDER BY
    TotalPerdidas DESC;
    `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


const port = 3001;
app.listen(port, () => {
    console.log(`Servidor API iniciado`);
});