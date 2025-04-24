import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";

import authRouter from "./middleware/userAuth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRET_KEY));

app.use("/",authRouter);

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});