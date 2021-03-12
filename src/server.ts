import express from 'express';
import 'reflect-metadata';
import './database';

const app = express();

app.listen(3000, () => console.log("Server is running"));