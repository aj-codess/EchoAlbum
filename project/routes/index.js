import express from "express";
import { getMetrics } from "./../controller/metricsController.js";
import webhookRoutes from "./webhookRoutes.js";
import metricsRoutes from "./metricsRoutes.js";

const router = express.Router();

app.use("/webhook", webhookRoutes);
app.use("/metrics", metricsRoutes);

export default router;