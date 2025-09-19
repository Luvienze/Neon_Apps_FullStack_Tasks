//  Initialize express
const express = require('express');
const app = express();
const router = express.Router();

//  Initialize fs module
const fs = require('node:fs');
const file = 'D:/dev-neon-apps-task/Neon_Apps_FullStack_Tasks/backend/04/log.txt'

//  Use express json
app.use(express.json());

//  Log request method and URL
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} | $${req.method} ${req.url}\n`;
    saveLogToFileFromConsole(file, log);
    next();
})

//  Initialize task model
const tasks = require('./task');

//  Get all tasks
router.get('/tasks', (req, res, next) => {
    if(!tasks.length === 0){
        res.status(404).json({message: 'Task list is empty'})
        const log = 'Task list is empty';
        saveLogToFileFromConsole(file,log);
        next();
    }else{
        res.status(200).json(tasks);
        const log = `Task list sent succesfully.\n`;
        saveLogToFileFromConsole(file,log);
        next();
    }
})

//  Get single task by id
router.get('/task/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id == id);
   
    if(!task){
        res.status(404).json({message: `No task found with id: ${id}`});
        const log = `No task found with id: ${id}\n`;
        saveLogToFileFromConsole(file,log);
        next();
        
    }else{
        res.status(200).json(task);
        const log = `Task with id: ${id} is found.\n`;
        saveLogToFileFromConsole(file,log);
        next();
    }
})

//  Create new task
router.post('/task', (req, res, next) => {
    const newTask = req.body;
    if(!newTask){
        res.status(500).json({message: `Task could not added... || Task: ${newTask}`});
        const log ='Task could not added\n';
        saveLogToFileFromConsole(file,log);
        next();
    }else{
        tasks.push(newTask);
        res.status(200).json({message: `New task has been added successfully! || Task: ${newTask}`});
        const log = `New task has been added.\n`;
        saveLogToFileFromConsole(file,log);
        next();
    }
})

//  Delete task by id
router.delete('/task/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id == id);
    
    if(index === -1){
        res.status(404).json({ message: `Task with id:${id} could not found...`})
        const log = `Task with id: ${id} could not found.\n`;
        saveLogToFileFromConsole(file, log);
        next();
    }else{
        tasks.splice(index, 1);
        res.status(200).json({ message: `Task with id: ${index} has been deleted successfully`});
        const log = `Task with id: ${index} has been deleted successfully.\n`
        saveLogToFileFromConsole(file, log);
        next(); 
    }
})

//  Update task
router.patch('/task', (req, res, next) => {
    const updatedTask = req.body;
    const index = tasks.findIndex(t => t.id == updatedTask.id);
    if(index === -1){
        return res.status(404).json({message: `Could not found task with id: ${updatedTask.id}`})
    }

    tasks[index].name = updatedTask.name;
    tasks[index].isCompleted = updatedTask.isCompleted;
    res.status(200).json({message: `Task has been updated successfully!`});
    const log = `Task with id: ${tasks[index].id} has been updated.\n`;
    saveLogToFileFromConsole(file, log);
    next();
})

//  Connect routes to server
app.use('/api/v1', router);

//  Start server
app.listen(3000, () =>{
    console.log(`Server started...`)
})

//  Functions
function saveLogToFileFromConsole(file, log){
    console.log(log);
    fs.appendFile(file,log, (err) => {
        if(err) console.error('Error writing log to file', err);
    });
}
