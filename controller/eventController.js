import Event from "./../models/eventModel.js";
import utility from "./../services/utility.js";
import QueueManager from "./../services/engine.js";

const createEvent = async (req, res) => {
    try{
        const { name, role, isOpen } = req.body;

        if (!name || !role) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const eventId=utility.genId();

        let eventToken;
        if(!isOpen){
            eventToken = Math.random().toString(36).substring(2, 15);
        };

        const newEvent = new Event({
            eventId,
            eventName: name,
            role,
            ownerId:req.user,
            admins: [req.user],
            submembers: [],
            awaitingSubmembers: [],
            settings: {
                openEvent: isOpen
            }
        });

        const savedData=await newEvent.save();

        if(savedData){
           return  res.status(201).json({ message: "Event created successfully", eventData: savedData });
        };

        return res.status(500).json({ message: "Failed to create event" });

    } catch(error){
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




const deleteEvent = async (req, res) => {
    try{

        const {eventId} = req.body;
        if (!eventId) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const eventData=await Event.findOne({eventId});
        if(!eventData){
            return res.status(404).json({ message: "Event not found" });
        };

        if(eventData.ownerId !== req.user){
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        } else{
            await Event.deleteOne({eventId});
            return res.status(200).json({ message: "Event deleted successfully" });
        };

    } catch(error){
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




const getSubmembers = async (req, res) => {
    try{

        const { eventId } = req.body;
        
        const eventData=await Event.findOne({eventId});
        if(!eventData){
            return res.status(404).json({ message: "Event not found" });
        };

        return res.status(200).json({ message: "Submembers fetched successfully", submembers: eventData.submembers });

    } catch(error){
        console.error("Error getting submembers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




const acceptInEvent = async (req, res) => {
    try{

        const {eventId,userId}=req.body;

        const eventData=await Event.findOne({eventId});

        if(!eventData){
            return res.status(404).json({ message: "Event not found" });
        };

        if(eventData.ownerId !== req.user || !eventData.admins.includes(req.user)){
            return res.status(403).json({ message: "You are not authorized to accept this user" });
        };

        const userIndex=eventData.awaitingSubmembers.indexOf(userId);

        if(userIndex === -1){
            return res.status(404).json({ message: "User not found in awaiting submembers" });
        };

        const updatedSubmembers=await Event.findOneAndUpdate({eventId},
            { $push: { submembers: userId }, $pull: { awaitingSubmembers: userId } },
            { new: true }
        );

        if(updatedSubmembers && updatedSubmembers.submembers.includes(userId)){
            return res.status(200).json({ message: "User accepted successfully", submembers: updatedSubmembers.submembers });
        };

    } catch(error){
        console.error("Error getting owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




const makeOpen = async (req, res) => {
    try{

        const {eventId}=req.body;

        const eventData=await Event.findOne({eventId});
        if(!eventData){
            return res.status(404).json({ message: "Event not found" });
        };

        if(eventData.ownerId !== req.user){
            return res.status(403).json({ message: "You are not authorized to make this event open" });
        };

        const updatedEvent=await Event.findOneAndUpdate({eventId},
            { $set: { "settings.openEvent": true } },
            { new: true }
        );

        if(updatedEvent && updatedEvent.settings.openEvent){
            return res.status(200).json({ message: "Event made open successfully", eventData: updatedEvent });
        };

    } catch(error){
        console.error("Error making event open:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getAllEvents = async (req, res) => {
    try{

        const eventIds = await Event.find({}, { eventId: 1, _id: 0 });

        if(eventIds && eventIds.length > 0){
            return res.status(200).json({ message: "Events fetched successfully", events });
        } else{
            return res.status(404).json({ message: "No events found" });
        };

    } catch(error){
        console.error("Error getting all events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export default {
    createEvent,
    deleteEvent,
    getSubmembers,
    acceptInEvent,
    makeOpen,
    getAllEvents
}