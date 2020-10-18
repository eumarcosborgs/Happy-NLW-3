import 'reflect-metadata';
import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';
import routes from './routes';
import errorHandler from './errors/handler';

const port = '3333';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
