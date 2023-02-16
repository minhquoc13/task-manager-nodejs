const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/async')
const {CustomAPIError, createCustomError} = require('../errors/custom-error')

class TaskController {

 gettAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

 getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({_id: taskId})

    if(!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }
    res.status(200).json({task})
})

 createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

 editTask = asyncWrapper( async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if(!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }
    res.status(200).json({task})
})

 deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findByIdAndDelete({_id: taskId})

    if(!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }

    res.status(200).json({task: null, status: 'success'})

 })

}

module.exports = new TaskController()