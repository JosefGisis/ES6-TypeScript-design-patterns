/**
 * Iterator provides controls to traverse a collection of elements without exposing the underlying representation of the collection.
 * So, that means, we should not allow any client to add or remove elements from the collection. There is a concrete iterator that
 * traverses the collection and provides the current element.
 *
 * When we have multiple aggregate types and need different iterators for each of them, the aggregate is responsible for creating the
 * iterator.
 */

class CustomList extends Array {
	iterator: CustomListIterator

	constructor(items: any[]) {
		super(...items)
		this.iterator = new CustomListIterator(this)
	}

	getIterator() {
		return this.iterator
	}
}

// An example of an external iterator (that is, the client controls the iteration, e.g. calls next, prev, etc)
class CustomListIterator {
	constructor(private aggregate: CustomList, private index: number = 0) {
		this.aggregate = aggregate
	}
	next() {
		this.index++
	}
	prev() {
		this.index--
	}
	current() {
		return this.aggregate[this.index]
	}
	isDone() {
		return this.index >= this.aggregate.length
	}
}

const myList = new CustomList([1, 2, 3, 4, 5, { name: 'John' }, [1, 2, 3], 'hello', 'world'])
const iterator = myList.getIterator()
console.log(iterator.current()) // 1
iterator.next()
console.log(iterator.current()) // 2
for (let i = 0; i < 4; i++) {
	iterator.next()
}
console.log(iterator.current()) // { name: 'John' }
for (let i = 0; i < 4; i++) {
	iterator.next()
}
console.log(iterator.isDone()) // true
