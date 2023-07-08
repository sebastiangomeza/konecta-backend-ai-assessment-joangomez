const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Tareas API', () => {
  beforeAll(async () => {
    // Configuración de conexión a una base de datos de prueba
    const mongoDBUrl = "mongodb+srv://test:yN92hrtp2CLIFsjS@sandbox.v6br6.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Cierra la conexión y elimina la base de datos de prueba
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  let token; // Token JWT válido para autenticación

  describe('Autenticación', () => {
    it('debería registrar un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ username: 'usuario', password: 'contrasena' })
        .expect(201);

      expect(response.body.message).toBe('Usuario registrado exitosamente');
    });

    it('debería iniciar sesión y obtener un token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'usuario', password: 'contrasena' })
        .expect(200);

      expect(response.body.token).toBeDefined();
      token = response.body.token; // Guarda el token para su uso posterior
    });
  });

  describe('Tareas', () => {
    let taskId; // ID de la tarea creada

    it('debería crear una nueva tarea', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Tarea 1', description: 'Descripción de la tarea 1' })
        .expect(201);

      expect(response.body.message).toBe('Tarea creada exitosamente');
      taskId = response.body.taskId; // Guarda el ID de la tarea creada
    });

    it('debería obtener una tarea por su ID', async () => {
      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.title).toBe('Tarea 1');
      expect(response.body.description).toBe('Descripción de la tarea 1');
    });

    it('debería obtener todas las tareas del usuario', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.length).toBe(1);
    });

    it('debería actualizar una tarea', async () => {
      const updatedTask = {
        title: 'Tarea 1 actualizada',
        description: 'Descripción de la tarea 1 actualizada',
        completed: true,
      };

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTask)
        .expect(200);

      expect(response.body.title).toBe(updatedTask.title);
      expect(response.body.description).toBe(updatedTask.description);
      expect(response.body.completed).toBe(true);
    });

    it('debería eliminar una tarea', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe('Tarea eliminada exitosamente');
    });
  });
});
