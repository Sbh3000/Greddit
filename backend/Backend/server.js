const cors = require('cors')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8000
const connectDB = require('./config/db')



const app = express()
app.use(cors())
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/posts',require('./routes/postRoutes'))
app.use('/api/greddit',require('./routes/gredditRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Initialised ${port}`))

