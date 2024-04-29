import { Router } from "express";
import taskController from "../controllers/taskController.js";
const router = Router();  

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.put('/status/:id', taskController.updateStatus);
router.delete('/:id', taskController.deleteTask);
export default router;