// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 示例 1：

// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]
// 示例 2：

// 输入：root = []
// 输出：[]

var flatten = function (root) {
	const list = []
	preorderTraversal(root, list)
	const size = list.length
	for (let i = 1; i < size; i++) {
		const prev = list[i - 1],
			curr = list[i]
		prev.left = null
		prev.right = curr
	}
}

const preorderTraversal = (root, list) => {
	if (root != null) {
		list.push(root)
		preorderTraversal(root.left, list)
		preorderTraversal(root.right, list)
	}
}

// 迭代方式
var flatten = function (root) {
	const list = []
	const stack = []
	let node = root
	while (node !== null || stack.length) {
		while (node !== null) {
			list.push(node)
			stack.push(node)
			node = node.left
		}
		node = stack.pop()
		node = node.right
	}
	const size = list.length
	for (let i = 1; i < size; i++) {
		const prev = list[i - 1],
			curr = list[i]
		prev.left = null
		prev.right = curr
	}
}
