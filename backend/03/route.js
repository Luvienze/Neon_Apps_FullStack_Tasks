//  Initialize Express
const express = require('express');
const app = express();
const router = express.Router();

// Initialize body parser middleware
app.use(express.json());

//  Initialize array
const tasks = require('./task');

//  API methods

//  Get task list
router.get('/tasks', (req, res) => {
    if(tasks.length < 0){
        return res.status(404).json({message: `Task list is empty`});
    }
    return res.status(200).json(tasks);
})

//  Get single task by id
router.get('/task/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const searchedTask = tasks.find(t => t.id === id);

    if(!searchedTask){
        return res.status(404).json({ message: `Cannot find task with id: ${id}`});
    }

    res.json(searchedTask);
})

//  Create single task
router.post('/task', (req,res) => {
    const task = req.body;
    
    if(task != null){
        tasks.push(task);
        return res.status(200).json({message: `Task has been added succesfully!`})
    }else{
        return res.status(500).json({message: `Task is not matched, check fields!`})
    }
})

//  Delete task by id
router.delete('/task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if(index === -1){
        return res.status(404).json({ message: `Task with id ${id} not found`});
    }
    tasks.splice(index, 1);
    res.status(200).json({message: `Task with id ${id} has been deleted successfully!`})
})

//  Update single task
router.patch('/task', (req, res) => {
    const updatedTask = req.body;
    const index = tasks.findIndex(t => t.id == updatedTask.id);
    if(index === -1){
        return res.status(404).json({message:`Could not find task with id: ${index}`});
    }
    tasks[index].name = updatedTask.name || tasks[index].name;
    tasks[index].isCompleted = updatedTask.isCompleted ?? tasks[index].isCompleted;
    return res.status(200).json({message: `Task with id: ${index} has been updated successfully!`})
})

//  Connect routes to server
app.use('/api/v1', router);

//  Start server
app.listen(3000, () => {
    console.log('Server is running');
})