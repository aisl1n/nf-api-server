import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import proxyRoutes from './routes/proxyRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/proxy', proxyRoutes);

app.listen(PORT, () => {
  console.log(`Server rodando e DB conectado! 🚀 porta:${PORT}`);
});
