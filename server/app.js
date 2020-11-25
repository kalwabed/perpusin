require('dotenv/config')
const express = require('express')
const cors = require('cors')
const app = express()

const { pool } = require('./config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/check', (req, res) => {
  res.json({})
})

app.get('/', (req, res) => {
  pool.query(
    'SELECT books.title, books.id, books.publish_date, authors.name, books.author_id FROM books JOIN authors ON books.author_id=authors.id',
    (err, result) => {
      if (err) {
        throw err
      }
      res.json(result.rows)
    }
  )
})

app.get('/authors', (req, res) => {
  pool.query('SELECT * from authors', (err, result) => {
    if (err) throw err
    res.json(result.rows)
  })
})

app.post('/', (req, res) => {
  const { author, title, publishDate } = req.body
  pool.query(
    'INSERT INTO books (author_id, title, publish_date) VALUES ($1, $2, $3)',
    [author, title, publishDate],
    (err, result) => {
      if (err) throw err
      res.status(201).json({ status: 'success', msg: `Book with title '${title}' has been added.` })
    }
  )
})

app.post('/authors', (req, res) => {
  const { email, name } = req.body
  pool.query('INSERT INTO authors (name, email) values($1,$2)', [name, email], (err, result) => {
    if (err) throw err
    res.status(201).json(result.rows)
  })
})

app.delete('/', (req, res) => {
  const { id } = req.body
  pool.query('DELETE FROM books where id=$1', [id], (err, result) => {
    if (err) throw err
    res.status(200).json({ success: true, msg: 'Buku berhasil dihapus.' })
  })
})

app.put('/', (req, res) => {
  const { publishDate, title, authorId, id } = req.body
  if (!authorId) {
    return res.status(404).json({ success: false, msg: 'error. author id kosong.' })
  }
  pool.query(
    'UPDATE books SET title=$1, publish_date=$2, author_id=$3 WHERE id=$4',
    [title, publishDate, authorId, id],
    (err, result) => {
      if (err) throw err
      res.status(201).json({ success: true, msg: 'Buku berhasil diupdate.' })
    }
  )
})

app.listen(3001, () => {
  console.log('Server running in 3001')
})
