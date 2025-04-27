class queue{
    
    constructor() {
        this.queue = [];
        this.processed=0;
        this.failed=0;
    }

    enqueue(item) {
        try{
            if(!item){
                failed++;
                return false;
            };

            this.queue.push(item);
            processed++;
            return true;
        } catch(error){
            failed++;
            return false;
        }
    }

    dequeue() {
        return this.queue.isEmpty() ? "Queue is empty" : this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    peek() {
        return this.queue.isEmpty() ? "Queue is empty" : this.queue[0];
    }

    clear() {
        this.queue = [];
        return true;
    }

    updateFailed() {
        this.failed++;
    }
}

export default queue;