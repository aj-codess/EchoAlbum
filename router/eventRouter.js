import express from 'express';
import eventController from '../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/create", (req, res) => {
    eventController.createEvent(req, res);
});

eventRouter.delete("/delete", (req, res) => {
    eventController.deleteEvent(req, res);
});



export default eventRouter;