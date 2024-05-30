import express from 'express';
import path from 'path';
import cors from 'cors';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const appPath = path.resolve(process.cwd(), 'dist');

console.log('appPath :>> ', appPath);
console.log('PORT :>> ', PORT);
app.use(cors());

app.use(express.static(appPath));

app.listen(PORT, () => {});

