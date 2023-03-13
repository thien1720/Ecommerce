const express = require('express')
const app = express()

const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3001

const route = require('./routers')
const connectDB = require('./config/dbConfigConect')
connectDB()


// HTTP logger
app.use(morgan('combined'))
app.use(express.json())

// Router init
route(app)


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))