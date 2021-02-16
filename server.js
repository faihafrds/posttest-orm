const express = require('express')
const app = express()
const { Book } = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/books', (req, res) =>{
    Book.findAll()
    .then(books => {
        res.status(200).json(books)
    })
})

app.get('/books/:id', (req, res) => {
    Book.findOne({
        where: {id: req.params.id}
    })
        .then(books => {
            res.status(200).json(books)
    })
})

app.post('/books', (req, res) => {
    Book.create({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre
    })
    .then(() => {
        res.status(201).json('Data are successfully created')
    })
    .catch(err => {
        res.status(422).json("Can't add the new data")
    })
})

app.put('/books/:id', (req, res) => {
    Book.update({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre
    }, {
        where: { id: req.params.id}
    })
    .then(article => {
        res.status(201).json(`Book with id ${req.params.id} already updated`)
    })
    .catch(err => {
        res.status(422).json("Can't update book")
    })
})

app.delete('/books/:id', (req, res) => {
    Book.destroy({
        where: { id: req.params.id}
    })
    .then(() => {
        res.status(200).json(`Book with id ${req.params.id} already deleted`)
    })
    .catch(err => {
        res.status(422).json("Can't delete book")
    })
})

app.listen(3000, () => console.log('Server Ready!'))