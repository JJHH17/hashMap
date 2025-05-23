export default class HashMap {
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

        return Math.abs(hashCode) % this.capacity; // Done to prevent us from overflowing capacity
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

    // Allows us to return a value, based on the key provided
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1] // Returns relevant key value pair
            }
        }
        return null; // Returns null if key is not found
    }

    // Returns value that is assigned to argument key
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [k, v] = bucket[i];
            if (k === key) {
                return true; // Returns true if key value is found
            }
        }
        return false; // Return false if not found
    }

    // Allows us to remove entry with key and return true, else returns false
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [k, _] = bucket[i];
            if (k === key) {
                bucket.splice(i, 1); // Removes key value pair
                this.size--; // Decreases size
                return true; // Returns true if found
            }
        }
        return false; // Returns false if key is not found
    }

    // Returns the length of keys (using size variable)
    length() {
        return this.size;
    }

    // Clears all entries 
    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []); // Clears buckets
        this.size = 0;
    }

    // Returns an array of keys when called
    key() {
        const keyArray = []; // This is where we'll feed our keys and return from

        for (const bucket of this.buckets) {
            for (const [key, _] of bucket) {
                keyArray.push(key);
            }
        }

        return keyArray; // Returns when loop is complete
    }

    // Returns an array of all values when called
    values() {
        const valueArray = []; 

        for (const bucket of this.buckets) {
            for (const [_, value] of bucket) {
                valueArray.push(value);
            }
        }

        return valueArray; // Returns when loop is complete
    }

    // Returns and array that contains both the key and the value entries
    entries() {
        const allEntries = []; // We'll feed values and keys into here to be returned
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                allEntries.push([key, value]);
            }
        }
        return allEntries; // Returns array
    }
}

const test = new HashMap();

test.set('carrot', 'orange');


test.length();