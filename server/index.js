const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'JSGDataBase'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//Neuigkeiten

app.get("/api/get_news", (req, res)=> {
    const sqlSelect = "SELECT * FROM news"

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/api/add_news", (req, res) => {

    const title = req.body.title
    const text = req.body.text
    const image = req.body.image

    const sqlInsert = "INSERT INTO news (title, text, img_url) VALUES (?, ?, ?)"

    db.query(sqlInsert, [title, text, image], (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.delete("/api/delete_news/:id", (req, res)=>{
    const id = req.params.id

    const sqlDelete = "DELETE FROM news WHERE id = ?"

    db.query(sqlDelete, id, (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

//Termine

app.get("/api/get_dates", (req, res)=> {
    const sqlSelect = "SELECT * FROM dates"

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/api/add_date", (req, res) => {

    const title = req.body.title
    const text = req.body.text
    const date = req.body.date

    const sqlInsert = "INSERT INTO dates (date, title, text) VALUES (?, ?, ?)"

    db.query(sqlInsert, [date, title, text], (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.delete("/api/delete_date/:id", (req, res)=>{
    const id = req.params.id

    const sqlDelete = "DELETE FROM dates WHERE id = ?"

    db.query(sqlDelete, id, (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.listen(3006, () => {
    console.log("running on port 3006")
})