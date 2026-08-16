// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，
// 满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 方法二：存储父节点

// 思路

// 我们可以用哈希表存储所有节点的父节点，然后我们就可以利用节点的父节点信息从 p 结点开始不断往上跳，
// 并记录已经访问过的节点，再从 q 节点开始不断往上跳，如果碰到已经访问过的节点，那么这个节点就是我们要找的最近公共祖先。

// 算法

// 从根节点开始遍历整棵二叉树，用哈希表记录每个节点的父节点指针。
// 从 p 节点开始不断往它的祖先移动，并用数据结构记录已经访问过的祖先节点。
// 同样，我们再从 q 节点开始不断往它的祖先移动，如果有祖先已经被访问过，
// 即意味着这是 p 和 q 的深度最深的公共祖先，即 LCA 节点。
function lowestCommonAncestor(root, p, q) {
	let parent = new Map()
	let visited = new Set()

	function dfs(root) {
		if (root.left != null) {
			parent.set(root.left.val, root)
			dfs(root.left)
		}
		if (root.right != null) {
			parent.set(root.right.val, root)
			dfs(root.right)
		}
	}

	dfs(root)
	while (p != null) {
		visited.add(p.val)
		p = parent.get(p.val)
	}
	while (q != null) {
		if (visited.has(q.val)) {
			return q
		}
		q = parent.get(q.val)
	}
	return null
}
