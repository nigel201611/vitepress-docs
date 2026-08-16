// 实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：
// BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
// boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
// int next()将指针向右移动，然后返回指针处的数字。
// 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。

// 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。
// 方法一：扁平化

// 我们可以直接对二叉搜索树做一次完全的递归遍历，获取中序遍历的全部结果并保存在数组中。随后，我们利用得到的数组本身来实现迭代器。

var BSTIterator = function (root) {
	this.idx = 0
	this.arr = []
	this.inorderTraversal(root, this.arr)
}

BSTIterator.prototype.next = function () {
	return this.arr[this.idx++]
}

BSTIterator.prototype.hasNext = function () {
	return this.idx < this.arr.length
}

BSTIterator.prototype.inorderTraversal = function (root, arr) {
	if (!root) {
		return
	}
	this.inorderTraversal(root.left, arr)
	arr.push(root.val)
	this.inorderTraversal(root.right, arr)
}

// 方法二：迭代

// 除了递归的方法外，我们还可以利用栈这一数据结构，通过迭代的方式对二叉树做中序遍历。此时，我们无需预先计算出中序遍历的全部结果，
// 只需要实时维护当前栈的情况即可。

var BSTIterator = function (root) {
	this.cur = root
	this.stack = []
}

BSTIterator.prototype.next = function () {
	while (this.cur) {
		this.stack.push(this.cur)
		this.cur = this.cur.left
	}
	this.cur = this.stack.pop()
	const ret = this.cur.val
	this.cur = this.cur.right
	return ret
}

BSTIterator.prototype.hasNext = function () {
	return this.cur !== null || this.stack.length
}
