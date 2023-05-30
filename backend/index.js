const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_la_base_de_datos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Puntos finales para los libros
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) {
      console.error('Error al obtener los libros:', err);
      return res.status(500).json({ error: 'Error al obtener los libros.' });
    }
    res.json(result);
  });
});

app.post(
  '/books',
  [
    check('title').notEmpty(),
    check('author').notEmpty(),
    check('summary').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, summary } = req.body;
    const book = { title, author, summary };

    db.query('INSERT INTO books SET ?', book, (err, result) => {
      if (err) {
        console.error('Error al crear un libro:', err);
        return res.status(500).json({ error: 'Error al crear un libro.' });
      }
      res.json({ message: 'Libro creado exitosamente.' });
    });
  }
);

// Manejo de otros puntos finales (actualizar y eliminar)
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, summary } = req.body;
    const book = { title, author, summary };

    db.query('UPDATE books SET ? WHERE id = ?', [book, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar un libro:', err);
            return res.status(500).json({ error: 'Error al actualizar un libro.' });
        }
        res.json({ message: 'Libro actualizado exitosamente.' });
    });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM books WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Error al eliminar un libro:', err);
            return res.status(500).json({ error: 'Error al eliminar un libro.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Libro no encontrado.' });
        }

        res.json({ message: 'Libro eliminado exitosamente.' });
    });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
