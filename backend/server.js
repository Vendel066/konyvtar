const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port:  3307,
  password: "",
  database: "konyvkolcsonzes",
});

// Gyökér útvonal, tesztelésre
app.get("/", (req, res) => {
  res.send("Fut a backend!");
});

app.get("/kolcsonozesek", (req, res) => {
    const sql = " SELECT u.diakneve, k.konyvcime, m.mufaj, kz.kolcsonzes_ido FROM kolcsonzes kz JOIN user u ON kz.felhasznalo_id = u.felhasznalo_id  JOIN konyvek k ON kz.konyvek_id = k.konyvek_id  JOIN mufaj m ON k.mufaj_id = m.mufaj_id ";   
    db.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
  

// Szerver indítása a 3001-es porton
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});