import express from 'express';
import { signup } from "./routes/auth/signup.js";
import { login } from "./routes/auth/login.js";
import {addGroup} from "./routes/groups/addGroup.js"
import {addUsersToGroup} from "./routes/groups/users/addUsersToGroup.js"
import { authenticateRequest } from "./routes/auth/authenticateRequest.js";
import { handleErrors } from './routes/handleErrors.js';
import { getCurrentUser } from './routes/users/getCurrentUser.js';

const app = express();

app.use(express.json());

//signup
app.post('/signup', signup);

//login
app.post('/login', login);

app.use((req, res, next) => {
    const userId = Number(authenticateRequest(req, res));

    if (userId != -1) {
        req.body["userId"] = userId;
        next();
    }
})

app.post('/groups', addGroup);

app.post('/groups/:group_id/users', addUsersToGroup);

app.get('/user',getCurrentUser);
 
app.use(handleErrors);

app.listen(3000, () => {
    console.log("server running on port 3000");
});