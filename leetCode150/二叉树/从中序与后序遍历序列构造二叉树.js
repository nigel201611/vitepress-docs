// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

// 示例 1:

// 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// 输出：[3,9,20,null,null,15,7]
var buildTree = function (inorder, postorder) {
	let post_idx
	const idx_map = new Map()
	const helper = (in_left, in_right) => {
		// 如果这里没有节点构造二叉树了，就结束
		if (in_left > in_right) {
			return null
		}

		// 选择 post_idx 位置的元素作为当前子树根节点
		const root_val = postorder[post_idx]
		const root = new TreeNode(root_val)

		// 根据 root 所在位置分成左右两棵子树
		const index = idx_map.get(root_val)

		// 下标减一
		post_idx--
		// 构造右子树
		root.right = helper(index + 1, in_right)
		// 构造左子树
		root.left = helper(in_left, index - 1)
		return root
	}

	// 从后序遍历的最后一个元素开始
	post_idx = postorder.length - 1

	// 建立（元素，下标）键值对的哈希表
	let idx = 0
	inorder.forEach((val, idx) => {
		idx_map.set(val, idx)
	})
	return helper(0, inorder.length - 1)
}
