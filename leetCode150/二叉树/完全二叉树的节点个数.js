// 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

// 完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，
// 则该层包含 1~ 2h 个节点。

// 输入：root = [1,2,3,4,5,6]
// 输出：6
// 如何判断第 k 个节点是否存在呢？如果第 k 个节点位于第 h 层，则 k 的二进制表示包含 h+1 位，
// 其中最高位是 1，其余各位从高到低表示从根节点到第 k 个节点的路径，0 表示移动到左子节点，1 表示移动到右子节点。
// 通过位运算得到第 k 个节点对应的路径，判断该路径对应的节点是否存在，即可判断第 k 个节点是否存在。

const exists = (root, level, k) => {
	let bits = 1 << (level - 1)
	let node = root
	while (node !== null && bits > 0) {
		if (!(bits & k)) {
			node = node.left
		} else {
			node = node.right
		}
		bits >>= 1
	}
	return node !== null
}

var countNodes = function (root) {
	if (root === null) {
		return 0
	}
	let level = 0
	let node = root
	while (node.left !== null) {
		level++
		node = node.left
	}
	let low = 1 << level,
		high = (1 << (level + 1)) - 1
	while (low < high) {
		const mid = Math.floor((high - low + 1) / 2) + low
		if (exists(root, level, mid)) {
			low = mid
		} else {
			high = mid - 1
		}
	}
	return low
}
