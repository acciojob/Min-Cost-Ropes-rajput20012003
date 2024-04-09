function mincost(arr) {
    // Initialize a priority queue or min-heap
    const pq = new MinHeap();

    // Insert all ropes into the priority queue
    for (const length of arr) {
        pq.insert(length);
    }

    let totalCost = 0;

    // Merge ropes until only one remains
    while (pq.size() > 1) {
        // Extract the two smallest ropes
        const min1 = pq.extractMin();
        const min2 = pq.extractMin();

        // Calculate the cost of merging them
        const mergedLength = min1 + min2;

        // Add the cost to the total
        totalCost += mergedLength;

        // Insert the merged rope back into the priority queue
        pq.insert(mergedLength);
    }

    return totalCost;
}

// Define the MinHeap class
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.size() === 0) {
            return null;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        while (index < this.size()) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestChildIndex = null;

            if (leftChildIndex < this.size()) {
                smallestChildIndex = leftChildIndex;
            }

            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex === null || this.heap[index] <= this.heap[smallestChildIndex]) {
                break;
            }

            this.swap(index, smallestChildIndex);
            index = smallestChildIndex;
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// Test cases
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33
