const express = require("express");
const db = require("../db");
const router = express.Router();

// Fetch all books
router.get("/", (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add a new book
router.post("/", (req, res) => {
    const { title, author, price, image } = req.body;
    db.run("INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)",
        [title, author, price, image],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        });
});

// Delete a book
router.delete("/:id", (req, res) => {
    db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;