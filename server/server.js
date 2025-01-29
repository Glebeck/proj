const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5001;


app.use(express.json());
app.use(cors());


const dataPath = path.join(__dirname, 'data.json');

app.get('/api/books', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => { // Исправлено: utf8 вместо uft8
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return res.status(500).json({ error: 'Ошибка при чтении файла' });
    }
    try {
      const books = JSON.parse(data);
      res.json(books);
    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
      res.status(500).json({ error: 'Ошибка при обработке данных' });
    }
  });
});
const readData = async () => {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
};

const writeData = async (books) => {
  await fs.writeFile(dataPath, JSON.stringify(books, null, 2));
};

// Получение списка книг
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => { // Исправлено: utf8 вместо uft8
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return res.status(500).json({ error: 'Ошибка при чтении файла' });
    }
    try {
      const books = JSON.parse(data);
      newBook.id = books.length + 1; // Генерация ID
      books.push(newBook); // Добавление новой книги в массив
      fs.writeFile(dataPath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
          console.error('Ошибка при записи файла:', err);
          return res.status(500).json({ error: 'Ошибка при записи файла' });
        }
        res.status(201).json(newBook);
      });
    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
      res.status(500).json({ error: 'Ошибка при обработке данных' });
    }
  });
});


// Обновление закладки
app.patch('/api/books/:id/bookmark', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const books = await readData();
    
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return res.status(404).send('Книга не найдена');
    
    // Добавляем поле isBookmarked если его нет
    if (!books[bookIndex].hasOwnProperty('isBookmarked')) {
      books[bookIndex].isBookmarked = false;
    }
    
    books[bookIndex].isBookmarked = !books[bookIndex].isBookmarked;
    
    await writeData(books);
    res.json(books[bookIndex]);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
