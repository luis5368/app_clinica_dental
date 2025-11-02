// server.ts mínimo
import express from 'express';
import cors from 'cors';
import productosRouter from './src/routes/producto.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/productos', productosRouter);

app.listen(4000, '0.0.0.0', () => {
  console.log('Servidor API corriendo en http://0.0.0.0:4000');
});
