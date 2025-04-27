import WebHooks from "node-webhooks";
import queue from "./../services/engine.js";

const hooks = new WebHooks({
    paths: {
        github: '/webhook',
      },
  });


hooks.on("webhook",async (req,res) => {
    try{
        const payload=req.body;

        if(queue.size()>=100){
            queue.updateFailed();
            return res.status(429).send("Too Many Requests");
        };

        const isAppended=await queue.enqueue(payload);

        if(!isAppended){
            const reTrigger=await queue.enqueue(payload);
            if(!reTrigger){
                queue.updteFailed();
                return res.status(429).send("Failed to enqueue the payload");
            };
        };

        res.status(202).send("Webhook Payload Received");

    } catch(error){
        console.log("Internal Server Error With Webhook - ",error.message);
        return res.status(500).send("Server Related Error");
    }
});


export default hooks;