import manager from "./../services/engine.js";

const getMetrics = async (req, res) => {
    try{
        const QueueManager=new manager();

        const {eventId}=req.query;
        const id=req.user;

        if(!eventId){
            return res.status(400).send("Event ID is required");
        };

        const metrics=await QueueManager.getStats(eventId);

        if(!metrics){
            return res.status(404).send("No Metrics Found");
        };

        return res.status(200).json(metrics);
    } catch(error){
        console.log("Internal Server Error With Metrics - ",error.message);
        return res.status(500).send("Server Related Error");
    }
};

export default {
    getMetrics
}