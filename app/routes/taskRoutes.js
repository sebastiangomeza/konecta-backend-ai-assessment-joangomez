const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:taskId', authMiddleware, taskController.getTask);
router.put('/:taskId', authMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *   post:
 *     summary: Crear una nueva tarea
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       description: Datos de la tarea a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: taskId
 *         in: path
 *         description: ID de la tarea a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *   put:
 *     summary: Actualizar una tarea
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: taskId
 *         in: path
 *         description: ID de la tarea a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos de la tarea actualizada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: taskId
 *         in: path
 *         description: ID de la tarea a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 */

