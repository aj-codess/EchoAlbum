import express from "express";

const logRouter = express.Router();

logRouter.get("/sigh", (req, res) => {
    console.log("Log route accessed");
    res.status(200).json({ message: "Log route accessed" });
}); 

export default logRouter;