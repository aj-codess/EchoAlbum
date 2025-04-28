import express from 'express';
import hooks from "./../controller/eventFeedController.js";

const eventFeedRouter = express.Router();

eventFeedRouter.post("/upload",(req,res)=>{
    hooks.emit("webhook",req,res);
});

export default eventFeedRouter;