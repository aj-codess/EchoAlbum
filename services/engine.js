class queue{
    
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        try{
            this.queue.push(item);
            return true;
        } catch(error){
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
}

export default queue;