import 'dotenv/config';
import 'reflect-metadata';
import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
.then(() => {
  console.log('Database connected');
  
  const PORT = 3000;
  app.listen(PORT, () => console.log(`App running in port ${PORT}`));
})
.catch((err) => console.log(err));