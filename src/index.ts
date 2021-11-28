import express from "express";
import dotenv from "dotenv";
import {courierRouter} from "./api/courier";
import {jsonErrorHandler} from "./utils/errors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;


// Add middlewares
app.use(express.json());

// Add routers
app.use('/couriers', courierRouter)

// Error Handler to send json response and http error
app.use((err, req, res, next) => jsonErrorHandler(err, res))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

