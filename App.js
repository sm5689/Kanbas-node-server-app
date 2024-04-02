import express from 'express';
import HeLLo from "./HeLLo.js";
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/moduLes/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import cors from "cors";


const app = express()
app.use(express.json());

app.use(cors());

app.use(express.json());

ModuleRoutes(app);

AssignmentRoutes(app);


CourseRoutes(app);

app.use(express.json());

Lab5(app);

HeLLo(app);

// app.get('/hello', (req, res) => {res.send('Life is good!')})

app.get('/test1', (req, res) => {res.send('Life is a little bit difficult!')})

// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

app.listen(process.env.PORT || 4000);

