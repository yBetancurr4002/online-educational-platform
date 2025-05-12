import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from 'router';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conexión a MongoDB establecida'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('api', router)

-
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la plataforma educativa en línea!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});