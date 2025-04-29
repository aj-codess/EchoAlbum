import { getMetricsData } from "./webhookController.js";

export const getMetrics = (req, res) => {
    const metrics = getMetricsData();
    res.json(metrics);
};