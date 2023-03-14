const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const mysql = require("mysql")
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const saltRounds = 10

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'JSGDataBase'
})

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
    session({
        key: "userId",
        secret: "jsgnordadmin",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
)

//Login

app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})

app.get("/api/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy()
        res.send({ message: 'logged user out' });
    }
})

app.post("/api/login", (req, res)=>{
    const mailadress = req.body.mailadress
    const password = req.body.password

    const sqlSelect = "SELECT * FROM users WHERE mailadress = ?"

    db.query(sqlSelect, mailadress ,(err, result) => {
        if(err){
            res.send({err: err})
        }
        if(result.length > 0){
            if(result[0].loginSet === 0){
                bcrypt.hash(password, saltRounds, (err, hash)=>{
                    db.query(
                        "UPDATE users SET password = ? WHERE mailadress = ?",
                        [hash, mailadress],
                        (err, answer) => {
                            console.log(err)
                        }
                    )
                    db.query(
                        "UPDATE users SET loginSet = 1 WHERE mailadress = ?",
                        mailadress,
                        (err, answer) => {
                            console.log(err)
                        }
                    )
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result)
                })
            } else {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({message: 'Ungültiges Passwort'})
                    }
                })
            }
        } else {
            res.send({message: 'Ungültige E-Mail Adresse'})
        }
    })

})

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

//Teams

app.get("/api/get_teams", (req, res)=> {
    const sqlSelect = "SELECT * FROM teams"

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/api/add_team", (req, res) => {

    const jugend = req.body.jugend
    const teamName = req.body.teamName
    const teamFoto = req.body.teamFoto
    const infotext = req.body.infotext
    const trainer = req.body.trainer
    const trainerMail = req.body.trainerMail
    const trainerTelefon = req.body.trainerTelefon
    const trainerFoto = req.body.trainerFoto

    const sqlInsert = "INSERT INTO teams (jugend, teamName, teamFoto, infotext, trainer, trainerMail, trainerTelefon, trainerFoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    db.query(sqlInsert, [jugend, teamName, teamFoto, infotext, trainer, trainerMail, trainerTelefon, trainerFoto], (err, result) => {
        if(err){
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.delete("/api/delete_team/:id", (req, res)=>{
    const id = req.params.id

    const sqlDelete = "DELETE FROM teams WHERE id = ?"

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