// A file responsible for testing our hashmap class

import HashMap from "./hashMap.js";

const test = new HashMap(); // Init for testing

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.length());

// Testing overwriting set keys
test.set('kite', 'lion');
test.set('lion', 'tiger');

console.log(test.length());

// Testing load balancing (this should go over the capacity)
console.log(test.capacity); // This now sits at 12
test.set('moon', 'silver');
console.log(test.length());
console.log(test.capacity); // This now sits at 32