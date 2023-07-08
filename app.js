const express = require('express');
const app = express();
const connectDB = require('./app/utils/db');
const initializeSwagger = require('./swagger');
const taskRoutes = require('./app/routes/taskRoutes');
const authRoutes = require('./app/routes/authRoutes');
require('dotenv').config();

connectDB();
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
initializeSwagger(app);

const port = process.env.PORT || 3000;
const server=app.listen(port, () => {
  console.log(`Server in ${port}`);
});

module.exports = server
