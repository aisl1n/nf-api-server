import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDatabase from './database/db.js'
import productRoutes from './routes/productRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import proxyRoutes from './routes/proxyRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/markets', marketRoutes);
app.use('/proxy', proxyRoutes);

connectDatabase()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server rodando e DB conectado! 🚀 porta:${PORT}`);
  });
})
.catch((err) => console.log(err));
