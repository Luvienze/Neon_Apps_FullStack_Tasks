//  Initialize express and router
const express = require('express');
const app = express();
const router = express.Router();

// Initialize fs module
const fs = require('node:fs');

// DB Connection & Model Schema
const { connectDB } = require('./index');
const {Student} = require('./student');

app.use(express.json())
connectDB();

// Initialize port 
const port = 3000;
const file = 'D:/dev-neon-apps-task/Neon_Apps_FullStack_Tasks/backend/05/log.txt';

// Middleware
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} | 
    ${req.method} ${req.url} \n`
    saveFromConsoleToLogFile(file, log);
    next();
})

// REST API ENDPOINTS

//  Get student list
router.get('/students', async (req, res, next) => {
    try{
        const students = await Student.find().select('name email createdAt');
        if(students.length === 0){
            res.status(404).json({message: `Students not found`});
            const log = 'Students not found.';
            saveFromConsoleToLogFile(file, log);
            next();
        }else{
            res.status(200).json(students);
            const log = 'Students found.';
            saveFromConsoleToLogFile(file, log);
            next();
        }
    }catch(err){
        res.status(500).json({error: err.message});
        const log = `${err.message}`;
        saveFromConsoleToLogFile(file, log);
    }
})

//  Get student by email
router.get('/student', async (req, res, next) => {
    try{
        const {email} = req.query;
        const student = await Student.findOne({email});
        
        if(!student){
            res.status(404).json({message: `Student with email: ${email} not found.`});
            const log = `Student with email ${email} not found`;
            saveFromConsoleToLogFile(file, log);
            next();
        }
        res.status(200).json(student);
        const log = `Student with email: ${email} found.`;
        saveFromConsoleToLogFile(file, log);
        next();

    }catch(err){
        res.status(500).json({error: err.message});
        const log = `error:  ${err.message}`;
        saveFromConsoleToLogFile(file, log);
        next();
    }
})

// Add new student
router.post('/student', async (req, res, next) => {
    try{
        const newStudent = new Student(req.body);
        await newStudent.save();

        res.status(201).json(`New student has been created!`);
        
        const log = `New student: ${student} has been created.\n`;
        saveFromConsoleToLogFile(file, log);
        next();

    }catch(err){
        res.status(500).json({error: err.message});
        const log = `error: ${err.message}\n`;
        saveFromConsoleToLogFile(file, log);
        next();
    }
})

//  Connect routes to server
app.use('/api/v1', router);

//  Start server
app.listen(port, () =>{
   const log = `Server started at port: ${port}...`;
   saveFromConsoleToLogFile(file, log);
})

//  FUNCTIONS
function saveFromConsoleToLogFile(file, log){
    console.log(log);
    fs.appendFile(file, log, (err) => {
        if(err) console.log("Error occurred during logging.");
    })
}