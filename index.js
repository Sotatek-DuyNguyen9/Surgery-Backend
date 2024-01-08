import express from 'express';
import cors from 'cors';
import initRoutes from './src/routes';
import cron from 'node-cron';
import { checkAndRunJob } from './src/helper/job';
require('dotenv').config();
require('./connection-db');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
checkAndRunJob();
// });

const PORT = 5000;

const listener = app.listen(PORT, () => {
  console.log('Server is running on port ' + listener.address().port);
});
