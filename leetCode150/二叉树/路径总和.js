// 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
// 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
// 如果存在，返回 true ；否则，返回 false 。

// 叶子节点 是指没有子节点的节点。

function hasPathSum(root, sum) {
	if (root == null) {
		return false
	}
	let queNode = []
	let queVal = []
	queNode.push(root)
	queVal.push(root.val)
	while (queNode.length) {
		let now = queNode.shift()
		let temp = queVal.shift()
		if (now.left == null && now.right == null) {
			if (temp == sum) {
				return true
			}
			continue
		}
		if (now.left != null) {
			queNode.push(now.left)
			queVal.push(now.left.val + temp)
		}
		if (now.right != null) {
			queNode.push(now.right)
			queVal.push(now.right.val + temp)
		}
	}
	return false
}
