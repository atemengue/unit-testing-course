import dotenv from "dotenv";
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import bodyParser = require('body-parser');



dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

const start = async () => {

  try {
    await  mongoose.connect("mongodb://localhost:27017/coffee");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});

start();