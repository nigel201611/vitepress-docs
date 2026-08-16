// 给定一个二叉树 root ，返回其最大深度。

// 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

// 示例 1：

// 输入：root = [3,9,20,null,null,15,7]
// 输出：3
// 示例 2：

// 输入：root = [1,null,2]
// 输出：2

function maxDepth(root) {
	if (root == null) {
		return 0
	} else {
		let leftHeight = maxDepth(root.left)
		let rightHeight = maxDepth(root.right)
		return Math.max(leftHeight, rightHeight) + 1
	}
}

function maxDepth(root) {
	if (root === null) {
		return 0
	}
	let queue = []
	queue.push(root)
	let ans = 0
	while (queue.length) {
		let size = queue.length
		while (size > 0) {
			let node = queue.shift()
			if (node.left !== null) {
				queue.push(node.left)
			}
			if (node.right !== null) {
				queue.push(node.right)
			}
			size--
		}
		ans++
	}
	return ans
}
