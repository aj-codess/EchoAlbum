import WebHooks from "node-webhooks";
import QueueManager from "./../services/engine.js";
import utility from "../services/utility.js";
import event from "../models/eventModel.js";

const hooks = new WebHooks({
    paths: {
        github: '/webhook',
      },
  });


hooks.on("webhook",async (req,res) => {
    try{
        const {eventId,ugcUrl}=req.body;
        const id=req.user;

        if(QueueManager.size(eventId)>=100){
            QueueManager.updateFailed(eventId);
            return res.status(429).send("Too Many Requests");
        };

        const isAppended=await QueueManager.enqueue(eventId,{id,ugcUrl});

        if(!isAppended){
            const reTrigger=await QueueManager.enqueue(eventId,{id,ugcUrl});
            if(!reTrigger){
                QueueManager.updateFailed(eventId);
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