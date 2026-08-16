// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

function DLinkedNode(key, value) {
	this.prev = null
	this.next = null
	this.key = key
	this.value = value
}
function LRUCache(opacity) {
	this.cache = new Map()
	this.size = 0
	this.capacity = opacity
	// 使用伪头部和伪尾部节点
	this.head = new DLinkedNode()
	this.tail = new DLinkedNode()
	this.head.next = this.tail
	this.tail.prev = this.head
}

LRUCache.prototype.get = function (key) {
	let node = this.cache.get(key)
	if (node == null) {
		return -1
	}
	// 如果 key 存在，先通过哈希表定位，再移到头部
	this.moveToHead(node)
	return node.value
}

LRUCache.prototype.put = function (key, value) {
	let node = this.cache.get(key)
	if (node == null) {
		// 如果 key 不存在，创建一个新的节点
		let newNode = new DLinkedNode(key, value)
		// 添加进哈希表
		this.cache.set(key, newNode)
		// 添加至双向链表的头部
		this.addToHead(newNode)
		++this.size
		if (this.size > this.capacity) {
			// 如果超出容量，删除双向链表的尾部节点
			let tail = this.removeTail()
			// 删除哈希表中对应的项
			this.cache.delete(tail.key)
			--this.size
		}
	} else {
		// 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
		node.value = value
		this.moveToHead(node)
	}
}

LRUCache.prototype.addToHead = function (node) {
	node.prev = this.head
	node.next = this.head.next
	this.head.next.prev = node
	this.head.next = node
}

LRUCache.prototype.removeNode = function (node) {
	node.prev.next = node.next
	node.next.prev = node.prev
}

LRUCache.prototype.moveToHead = function (node) {
	this.removeNode(node)
	this.addToHead(node)
}

LRUCache.prototype.removeTail = function () {
	let res = this.tail.prev
	this.removeNode(res)
	return res
}
