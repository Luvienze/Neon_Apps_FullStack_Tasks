// Import modules
const { error } = require('node:console');
const fs = require('node:fs')
const readline = require('readline')

// Initialize file
const fileName = 'D:/dev-neon-apps-task/Neon_Apps_FullStack_Tasks/backend/02/userFrom4.txt';

// Check if the file exists
function isFileExists(){
    try{
        if(!fs.existsSync(fileName)){
            fs.writeFileSync(fileName,'');
        }
        return true;
    } catch (error){
        console.error(error);
        return false;
    }
}
// Read file first to check if it is empty
// Get information from console
// Write it to file
function readFromFile(){

    if(isFileExists()){
        fs.readFile(fileName, 'utf8', (err, data) => {
            if(!err){
                if(data.length === 0){
                console.log('File is empty, no user information is found...')
                writeToFile();
            }
            else{
                console.log('File has data, user information has found...');
                console.log(data);
                const rl = readline.createInterface({input: process.stdin,output: process.stdout})
                rl.question('Do you want to change information? (Y/N)', (answer) => {
                    if(answer === 'Y'){
                        writeToFile();
                    }else{
                        console.log('File is closing...');
                        rl.close();
                    }
                })
            }
        }
            
    }) 
}}

function writeToFile(){
    // Get user information via console
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

     // Get information from console
    rl.question('What is your name?', (name)=>{
         rl.question('How old are you?', (age) => {
             rl.question('How many years do you have experience?', (exp) =>{
                rl.question('Have you graduate from university? (Y/N)' , (graduation) =>{
                    rl.close();    
                    const data = `Name: ${name} 
                         Age: ${age} 
                         Experience: ${exp} 
                         Graduation:${graduation}`
                    fs.writeFile(fileName, data, (err) => {
                        if(err){
                            console.error(err)
                        }else{
                            console.log('User information has been added!');
                            console.log('Reading from file...');
                            console.log(data);
                        }
                    });
                    
                })
            })
        })
    })
}

readFromFile();