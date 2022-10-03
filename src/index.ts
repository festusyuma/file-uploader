import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import Cors from 'cors';
import { reqLogger } from '@utils';
import router from './router';

const app = express();

app.use(Cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use(reqLogger); // request logger
app.use(process.env.BASEURL || '/', router); // routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
