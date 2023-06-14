import { v4 as uuidv4 } from 'uuid';

let tasks = [];

export const getTasks = (_req,res) => {
    res.send(tasks);
};

export const getTask =  (req,res) => {
    try {
    const { id } = req.params   

    const foundTask = tasks.find((task) => task.id === id);
    
    if(!foundTask){
        throw new Error("Task not found!");
    } 

    return res.status(200).send(foundTask);
    
    } catch (error) {
        console.log(error);
        return res.status(404).send(error.message);
    }
};

export const createTask = (req,res) => {
    try{
        const { title, description } = req.body;
        
        if(!title || !description) {
            throw new Error('You must follow the pattern:"Title":"(Your current title)", and "Description":"(Your current description)"');
        } else{
            const task = req.body
            tasks.push({ ...task, id: uuidv4()});
            res.status(201).send(`Task with the title ${task.title} added to the DB!`);
            
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
};


export const deleteTask =  (req,res) => {
    try {
        const { id } = req.params;
        const foundTask = tasks.find((task) => task.id === id);
    
        if(!foundTask){
            throw new Error("Task not found!");
        }     
        tasks = tasks.filter((task) => task.id !== id);
        res.status(200).send(`Task with the id ${id} deleted from the DB!`);
    } catch(error){
        console.log(error);
        res.status(404).send(error.message);
    }
};

export const updateTask =  (req,res) => {

    try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = tasks.find((task) => task.id === id);
    
    if(!task){
        throw new Error("Task not found!");
    }     

    if(title){
        task.title = title;

    }
    
    if(description){
        task.description = description;
    } 
    res.status(200).send(`Task with the id ${id} has been updated`);
    } catch(error){
        console.log(error);
            res.status(404).send(error.message);
    }
};

