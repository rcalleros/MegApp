import express from 'express';
import dotenv from 'dotenv';
import con from './database/connection';
import {UserRoutes} from './routes/UserRoutes';
// initialize configuration
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
// define a route handler for the User Operations
UserRoutes(app);

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
