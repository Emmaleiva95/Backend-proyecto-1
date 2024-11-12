import express from 'express';
import mockRoutes from './src/routes/mock.router.js'
import { connectDB } from './db.js'
import {__dirname} from './utils.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mocks', mockRoutes)

const httpServer = app.listen(8080, () => console.log('Servidor listo en el puerto '+ 8080));
connectDB();