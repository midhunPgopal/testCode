const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./Controller/routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://aps:aps@cluster0.tej6f.mongodb.net/myFirstDatabase')
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))

app.use('/api', router)

app.listen( 3001, () => console.log('Server started on 3001') )