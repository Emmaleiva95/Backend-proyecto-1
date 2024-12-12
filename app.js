import express from 'express';
import mockRoutes from './src/routes/mock.router.js';
import { connectDB } from './db.js';
import { __dirname } from './utils.js';
import dotenv from 'dotenv';
import cors from 'cors';
import setupSwagger from './swagger.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Bienvenido a la MocksAPI, haga clic aquí para ir a <a href="/api-docs">/api-docs</a>');});

setupSwagger(app);

app.use('/api/mocks', mockRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    connectDB();
});