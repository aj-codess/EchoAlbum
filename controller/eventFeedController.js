import WebHooks from "node-webhooks";
import manager from "./../services/engine.js";
import event from "./../models/eventModel.js";

const hooks = new WebHooks({
    paths: {
        github: '/webhook',
      },
      db: {},
  });


hooks.on("webhook",async (req,res) => {
    try{
        const QueueManager=new manager();

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

        QueueManager.processQueue(eventId);

    } catch(error){
        console.log("Internal Server Error With Webhook - ",error.message);
        return res.status(500).send("Server Related Error");
    }
});


export default hooks;