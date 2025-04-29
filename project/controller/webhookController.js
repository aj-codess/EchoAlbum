import queue from "./../models/queue.js";

let processing = 0;
const maxConcurrent = 30;
const queueOverload = 100;
const delay=300;


let totalRequests = 0;
let totalProcessed = 0;
let total429s = 0;

export const receiveWebhook = (req, res) => {
    totalRequests++;

    if (queue.size() >= queueOverload) {
        total429s++;
        return res.status(429).send('Too Many Requests');
    }

    queue.enqueue(req.body);
    res.status(202).send('Accepted');

    processQueue();
};

async function processItem(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                reject(new Error("Random failure"));
            } else {
                resolve();
            }
        }, delay);
    });
}


async function processQueue() {
    while (processing < maxConcurrent && !queue.isEmpty()) {
        const item = queue.dequeue();
        processing++;

        try {
            await processItem(item);
            totalProcessed++;
        } catch (error) {
            console.log('Processing failed, retrying...');
            try {
                await processItem(item);
                totalProcessed++;
            } catch (retryError) {
                console.log('Retry also failed.');
            }
        } finally {
            processing--;
            processQueue();
        }
    }
}


export const getMetricsData = () => ({
    totalRequestsReceived: totalRequests,
    totalProcessed,
    currentQueueLength: queue.size(),
    total429sReturned: total429s
});