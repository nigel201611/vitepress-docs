// 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
// 每条从根节点到叶节点的路径都代表一个数字：

// 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
// 计算从根节点到叶节点生成的 所有数字之和 。

// 叶节点 是指没有子节点的节点。
const dfs = (root, prevSum) => {
	if (root === null) {
		return 0
	}
	const sum = prevSum * 10 + root.val
	if (root.left == null && root.right == null) {
		return sum
	} else {
		return dfs(root.left, sum) + dfs(root.right, sum)
	}
}
var sumNumbers = function (root) {
	return dfs(root, 0)
}

// 方法二：广度优先搜索

// 思路与算法

// 使用广度优先搜索，需要维护两个队列，分别存储节点和节点对应的数字。

// 初始时，将根节点和根节点的值分别加入两个队列。每次从两个队列分别取出一个节点和一个数字，进行如下操作：

// 如果当前节点是叶子节点，则将该节点对应的数字加到数字之和；

// 如果当前节点不是叶子节点，则获得当前节点的非空子节点，并根据当前节点对应的数字和子节点的值计算子节点对应的数字，
// 然后将子节点和子节点对应的数字分别加入两个队列。

// 搜索结束后，即可得到所有叶子节点对应的数字之和。

var sumNumbers = function (root) {
	if (root === null) {
		return 0
	}
	let sum = 0
	const nodeQueue = []
	const numQueue = []
	nodeQueue.push(root)
	numQueue.push(root.val)
	while (nodeQueue.length) {
		const node = nodeQueue.shift()
		const num = numQueue.shift()
		const left = node.left,
			right = node.right
		if (left === null && right === null) {
			sum += num
		} else {
			if (left !== null) {
				nodeQueue.push(left)
				numQueue.push(num * 10 + left.val)
			}
			if (right !== null) {
				nodeQueue.push(right)
				numQueue.push(num * 10 + right.val)
			}
		}
	}
	return sum
}
