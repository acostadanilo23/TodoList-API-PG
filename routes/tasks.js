import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', createTask);

router.delete('/:id', deleteTask);

router.patch('/:id', updateTask);

export default router;