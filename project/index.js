import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

import webhookRoutes from "./routes/webhookRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/v1", router);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});