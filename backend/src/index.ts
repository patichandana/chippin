import express from 'express';
import { signup } from "./routes/auth/signup.js";
import { login } from "./routes/auth/login.js";
import {addGroup} from "./routes/groups/addGroup.js"
import {addUsersToGroup} from "./routes/groups/users/addUsersToGroup.js"
import { authenticateRequest } from "./routes/auth/authenticateRequest.js";
import { handleErrors } from './routes/handleErrors.js';
import { getCurrentUser } from './routes/users/getCurrentUser.js';
// import cors from "cors";
import cookieParser from 'cookie-parser';
import { addExpense } from './routes/expenses/addExpense.js';
import { getCurrencies } from './routes/expenses/getCurrencies.js';
import { getGroupDetails } from './routes/groups/getGroupDetails.js';
import { addUsersToGroupByEmail } from './routes/groups/users/addUsersToGroupByEmail.js';
import { logout } from './routes/auth/logout.js';
import { getDashboardBalance } from './routes/dashboard/getDashboardBalance.js';
import { getExpenses } from './routes/expenses/getExpenses.js';

const app = express(); //app is the backend server

// since we were running frontend and backend on different ports during development, we needed to enable CORS
// however now, we are using caddy as a reverse proxy, so frontend and backend appear to be on the same origin
// hence, we can disable CORS.
// Uncomment the below code if you are running frontend and backend on different origins
// app.use(
//     cors({ // cross origin resource sharing
//         origin: "http://localhost:5173",
//         credentials: true,
//         allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning', 'Cookie']
//     }));

app.use(express.json());
app.use(cookieParser());

//signup
app.post('/signup', signup);

//login
app.post('/login', login);

app.use(authenticateRequest); //middleware to authenticate all requests below this line

app.post('/groups', addGroup);

app.get('/groups/:group_id', getGroupDetails);

app.post('/groups/:group_id/users', addUsersToGroup);

app.post('/groups/:group_id/emails', addUsersToGroupByEmail);

app.get('/user',getCurrentUser);

app.post('/expenses', addExpense);

app.get('/expenses', getExpenses);

app.get('/currencies', getCurrencies);

app.get('/dashboard/balance', getDashboardBalance);

app.post('/logout', logout);

app.use(handleErrors);

app.listen(3000, () => {
    console.log("server running on port 3000");
});