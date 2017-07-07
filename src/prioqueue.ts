class PriorityQueue {
	private internalHeap:Array<any>;
	private comparator:(left:any,right:any) => boolean;
	constructor(comparator:(left:any,right:any) => boolean) {
		this.internalHeap = [];
		if(typeof comparator === "undefined") {
			this.comparator = (left,right) => left > right;
		}
		else {
			this.comparator = (x,y) => {
				if(typeof x === "undefined" || typeof y === "undefined") {
					return false;
				}
				else {
					return comparator(x,y);
				}
			};
		}
	}

	public push(element) {
		if(this.isEmpty()) {
            this.internalHeap.push(element);
        }
        else {
            let i = this.internalHeap.length;
            this.internalHeap.push(element);
            while(i!==0) {
            	let parent = Math.floor((i - 1)/2);
            	if(this.comparator(this.internalHeap[i],this.internalHeap[parent])) {
            		let tmp = this.internalHeap[i];
            		this.internalHeap[i] = this.internalHeap[parent];
            		this.internalHeap[parent] = tmp;
            	}
            	i = parent;
            }
        }
	}

	public pop() {
		if(this.isEmpty()) {
			throw new Error("Priority queue is empty")
		}
		else if (this.size() == 1) {
    		return this.internalHeap.pop();
    	}
    	else {
    		let result = this.peek();
    		this.internalHeap[0] = this.internalHeap.pop();
    		let i = 0;
    		while(i<this.size()) {
    			let left = (2*i)+1;
    			let right = (2*i)+2;
    			let next = i;
    			if(typeof this.internalHeap[right] === "undefined") {
					next = left;
				}
				else {
					if(this.comparator(this.internalHeap[left],this.internalHeap[right])) {
						next = left;
					}
					else {
						next = right;
					}
				}
				if(this.comparator(this.internalHeap[next],this.internalHeap[i])) {
					let tmp = this.internalHeap[next];
					this.internalHeap[next] = this.internalHeap[i];
					this.internalHeap[i] = tmp;
				}
				i = next;
    		}
    		return result;
    	}
	}

	public peek() {
		return this.internalHeap[0];
	}

	public size():number {
		return this.internalHeap.length;
	}

	public isEmpty():boolean {
		return this.internalHeap.length === 0;
	}

}

declare var module;
declare var exports;
declare var global;
declare var define;
if (typeof define === 'function' && define.amd) {
    define(function () { return PriorityQueue; });
} else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = PriorityQueue;
    }
    exports.PriorityQueue = PriorityQueue;
} else {
    global.PriorityQueue = PriorityQueue;
}