class hashMap {
    constructor(capacity=16, loadFactor=0.8) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0; // Allows us to dynamically re-size our map when needed
        this.buckets = new Array(this.capacity).fill(null).map(() => []); // Allows us to array map
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Checking if key already exists in array
        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // updating existing value if key matches
                return
            }
        }

        // If the key doesn't exist, we add new key value pair
        bucket.push([key, value]);
        this.size++;

        // Dynamically resizing map when needed
        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    // Allows us to resize map when needed
    _resize() {
        const oldBuckets = this.buckets; // Creating a copy of buckets
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value); // Rehashes and inserts key, value pairs into new buckets
            }
        }
    }
}

const hello = new hashMap();

console.log(hello.hash("hello how are you?"));