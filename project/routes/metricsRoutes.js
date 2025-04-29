import express from "express";
import { getMetrics } from "./../controller/metricsController.js";

const router = express.Router();

router.get("/metrics", getMetrics);

export default router;