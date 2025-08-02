import express from 'express';
import { signup } from "./routes/auth/signup.js";
import { login } from "./routes/auth/login.js";
import { authenticateRequest } from "./routes/auth/authenticateRequest.js";
import { handleErrors } from './routes/handleErrors.js';

const app = express();

app.use(express.json());

//signup
app.post('/signup', signup);

//login
app.post('/login', login);

app.use((req, res, next) => {
    const userId = Number(authenticateRequest(req, res));

    if (userId != -1) {
        // req.userId = userId;
        next();
    }
    return;
})

app.get('/', (req, res) => {
    // res.send(`your userId: ${req?.userId}`);
});
 
app.use(handleErrors);

app.listen(3000, () => {
    console.log("server running on port 3000");
});