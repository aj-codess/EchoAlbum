const createEvent = async (req, res) => {
    try{

    } catch(error){
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const deleteEvent = async (req, res) => {
    try{

    } catch(error){
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getSubmembers = async (req, res) => {
    try{

    } catch(error){
        console.error("Error getting submembers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const acceptInEvent = async (req, res) => {
    try{

    } catch(error){
        console.error("Error getting owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const makeOpen = async (req, res) => {
    try{

    } catch(error){
        console.error("Error making event open:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export default {
    createEvent,
    deleteEvent,
    getSubmembers,
    acceptInEvent
}