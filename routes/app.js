const express = require('express')
const auth = require('../routes/auth')
const task = require('../routes/task')

function route(app) {
    app.use('/', auth)
    app.use('/', task)
}

module.exports = route