import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';

const { Pool } = pg;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Todo-Paulo',
  password: 'pokem0nSS',
  port: '5432',
});

let tasks = [];

export const getTasks = async (_req, res) => {
    try {
      const query = 'SELECT * FROM tasks';
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
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

export const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        throw new Error('You must provide both a title and a description.');
      }
  
      const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
      const values = [title, description];
  
      const { rows } = await pool.query(query, values);
  
      res.status(201).json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };  


  export const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM tasks WHERE id = $1';
      const values = [id];
      await pool.query(query, values);
      res.status(200).send(`Task with ID ${id} deleted from the database.`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    
  };

  export const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const query = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3';
      const values = [title, description, id];
  
      await pool.query(query, values);
  
      res.status(200).send(`Task with the ID ${id} has been updated`);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  };
  



