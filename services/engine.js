class QueueManager {
    constructor() {
      this.queues = new Map();
    }
  
    _initQueue(id) {
      if (!this.queues.has(id)) {
        this.queues.set(id, {
          queue: [],
          totalPayload,
          processed: 0,
          failed: 0
        });
      }
    }
  
    enqueue(id, item) {
      this._initQueue(id);
  
      const q = this.queues.get(id);
  
      try {
        if (!item) {
          q.failed++;
          return false;
        }
  
        q.queue.push(item);
        q.processed++;
        return true;
      } catch (error) {
        q.failed++;
        return false;
      }
    }
  
    dequeue(id) {
      this._initQueue(id);
  
      const q = this.queues.get(id);
  
      if (q.queue.length === 0) {
        return "Queue is empty";
      }
  
      return q.queue.shift();
    }

  
    isEmpty(id) {
      this._initQueue(id);
      return this.queues.get(id).queue.length === 0;
    }
  
    size(id) {
      this._initQueue(id);
      return this.queues.get(id).queue.length;
    }
  
    peek(id) {
      this._initQueue(id);
  
      const q = this.queues.get(id);
  
      if (q.queue.length === 0) {
        return "Queue is empty";
      }
      return q.queue[0];
    }
  
    clear(id) {
      this._initQueue(id);
      this.queues.get(id).queue = [];
      return true;
    }
  
    updateFailed(id) {
      this._initQueue(id);
      this.queues.get(id).failed++;
    }
  
    getStats(id) {
      this._initQueue(id);
      const { processed, failed ,totalPayload} = this.queues.get(id);
      return { processed, failed,totalPayload };
    }
  }
  
  export default QueueManager;