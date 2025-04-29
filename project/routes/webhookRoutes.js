import express from "express";
import { receiveWebhook } from "./../controller/webhookController.js";

const router = express.Router();

router.post("/", receiveWebhook);

export default router;