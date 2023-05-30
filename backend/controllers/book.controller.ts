import { Request, Response } from 'express';
import mysql, { Connection, RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { validationResult, Result, ValidationError } from 'express-validator';
import { Book } from '../interfaces/book.interface';

const dbConfig: mysql.ConnectionOptions = {
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_la_base_de_datos',
};

let db: Connection;
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros.' });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, author, summary } = req.body;
  const book: Book = { title, author, summary };

  try {
    await db.query('INSERT INTO books SET ?', book);
    res.json({ message: 'Libro creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear un libro:', error);
    res.status(500).json({ error: 'Error al crear un libro.' });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, author, summary } = req.body;
  const book: Book = { title, author, summary };

  try {
    const [result] = await db.query<ResultSetHeader>('UPDATE books SET ? WHERE id = ?', [book, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Libro no encontrado.' });
    } else {
      res.json({ message: 'Libro actualizado exitosamente.' });
    }
  } catch (error) {
    console.error('Error al actualizar un libro:', error);
    res.status(500).json({ error: 'Error al actualizar un libro.' });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM books WHERE id = ?', id);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Libro no encontrado.' });
    } else {
      res.json({ message: 'Libro eliminado exitosamente.' });
    }
  } catch (error) {
    console.error('Error al eliminar un libro:', error);
    res.status(500).json({ error: 'Error al eliminar un libro.' });
  }
};
