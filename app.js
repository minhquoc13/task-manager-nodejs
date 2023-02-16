const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const task = require('./routes/task')
const auth = require('./routes/auth')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')
const passport = require('passport')
const session = require('express-session')
require('./middlewares/authenticate')
require('dotenv').config()

// middleware
app.use(session({
    secret: 'cat',
    cookie: {
        maxAge: 1000*60
    },
    saveUninitialized: true,
}))
app.use(passport.initialize())

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/v1/tasks', task)
app.use('/', auth)

app.use(notFound);
// error
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await connectDB(process.env.MONGO_URI)
    console.log('server is listening on port 3000...')
})