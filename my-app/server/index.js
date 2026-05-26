const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// YHTEYS XAMPP TIETOKANTAAN
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'minichat_db'
});

db.connect(err => {
    if (err) {
        console.error('VIRHE: XAMPP/MySQL ei ole päällä tai tietokanta puuttuu!');
        console.error(err.message);
    } else {
        console.log('Hienoa! Yhteys MySQL-tietokantaan toimii.');
    }
});

// REITTI 1: Hae kaikki viestit
app.get('/messages', (req, res) => {
    db.query("SELECT * FROM messages ORDER BY created_at ASC", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// REITTI 2: Tallenna uusi viesti
app.post('/messages', (req, res) => {
    const { text, sender } = req.body;
    db.query("INSERT INTO messages (text, sender) VALUES (?, ?)", [text, sender], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, text, sender });
    });
});

app.listen(3000, () => {
    console.log("Palvelin käynnistyi osoitteeseen http://localhost:3000");
});