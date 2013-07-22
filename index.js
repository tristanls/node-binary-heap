/*

index.js - binary heap

The MIT License (MIT)

Copyright (c) 2013 Tristan Slominski

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

"use strict";

// options:
//   heap: an array to treat directly as heap; no transformations will be made
//         on this array to satisfy the heap property; to build a heap from an
//         array use Heap.build({heap: array}); (default: [])
//   kind: one of: min-heap, max-heap (default: max-heap)
// *WARNING*: this Heap implementation uses 1-indexed arrays 
//            (instead of 0-indexed), array[0] is used to store heap size
var Heap = module.exports = function Heap (options) {
    var self = this;

    options = options || {};
    options.heap = options.heap || [];

    self.array = [options.heap.length].concat(options.heap);
    self.kind = options.kind || 'max-heap'; // one of: min-heap, max-heap
};

// options: see documentation of Heap()
Heap.build = function build (options) {
    var heap = new Heap(options);
    if (heap.kind == 'max-heap') {
        var middle = Math.floor(heap.size() / 2);
        for (var i = middle; i > 0; i--) {
            heap.maxHeapify(i);
        }
    }
    return heap;
};

// index: *required* the index of a node to find the left child of
// *WARNING*: this method is not safe for index < 1;
Heap.left = function left (index) {
    return index << 1;
};

// index: *required* the index of a node to find the parent of
// *WARNING*: this method is not safe for index < 1;
Heap.parent = function parent (index) {
    return index >> 1;
};

// index: *required* the index of a node to find the right child of
// *WARNING*: this method is not safe for index < 1;
Heap.right = function right (index) {
    return (index << 1) + 1;
};

Heap.prototype.dump = function dump () {
    var self = this;
    return self.array.slice(1);
};

// index: *required* the array index to start maxHeapify procedure on
Heap.prototype.maxHeapify = function maxHeapify (index) {
    var self = this;
    var left = Heap.left(index); // TODO: inline
    var right = Heap.right(index); // TODO: inline
    var heapSize = self.size(); // TODO: inline
    var largest;
    if (left <= heapSize && self.array[left] > self.array[index]) {
        largest = left;
    } else {
        largest = index;
    }
    if (right <= heapSize && self.array[right] > self.array[largest]) {
        largest = right;
    }
    if (largest != index) {
        var temp = self.array[index];
        self.array[index] = self.array[largest];
        self.array[largest] = temp;
        self.maxHeapify(largest);
    }
    return self;
};

Heap.prototype.size = function size () {
    var self = this;
    return self.array[0];
};