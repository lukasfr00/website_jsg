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

app.put("/api/edit_news", (req, res)=>{

    const id = req.body.id
    const title = req.body.title
    const text = req.body.text
    const image = req.body.image

    const sqlEdit = "UPDATE SET news (title, text, img_url) VALUES (?, ?, ?) WHERE id = ?"

    db.query(sqlEdit, [title, text, image, id], (err, result) => {
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

app.listen(3006, () => {
    console.log("running on port 3006")
})