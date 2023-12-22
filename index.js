import express from 'express';
import cors from 'cors';
import initRoutes from './src/routes';
require('dotenv').config();
require('./connection-db');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const PORT = 5000;

const listener = app.listen(PORT, () => {
  console.log('Server is running on port ' + listener.address().port);
});
