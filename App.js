import express from 'express';
import HeLLo from "./HeLLo.js";
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/moduLes/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "../kanbas-node-server-app/Kanbas/Users/routes.js";
import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';

mongoose.connect(CONNECTION_STRING);


// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express()
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
 );

 const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  

//  const sessionOptions = {
//     secret: "any string",
//     resave: false,
//     saveUninitialized: false,
//   };
//   app.use(
//     session(sessionOptions)
//   );
  

app.use(express.json());
const port = process.env.PORT || 4000;

UserRoutes(app);

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

