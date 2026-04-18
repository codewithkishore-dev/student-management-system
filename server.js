const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect DB
const db = new sqlite3.Database("./database.db");

// Create table
db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    course TEXT
)`);

// GET students
app.get("/students", (req, res) => {
    db.all("SELECT * FROM students", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// ADD student
app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    db.run(
        "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
        [name, email, course],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID });
        }
    );
});

// DELETE student
app.delete("/students/:id", (req, res) => {
    db.run("DELETE FROM students WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted successfully" });
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});

