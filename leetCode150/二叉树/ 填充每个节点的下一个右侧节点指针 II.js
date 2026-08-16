// 给定一个二叉树：

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。

// 初始状态下，所有 next 指针都被设置为 NULL 。

// 示例 1：

// 输入：root = [1,2,3,4,5,null,7]
// 输出：[1,#,2,3,#,4,5,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next 指针连接），
// '#' 表示每层的末尾。

var connect = function (root) {
	if (root === null) {
		return null
	}
	const queue = [root]
	while (queue.length) {
		const n = queue.length
		let last = null
		for (let i = 1; i <= n; ++i) {
			let f = queue.shift()
			if (f.left !== null) {
				queue.push(f.left)
			}
			if (f.right !== null) {
				queue.push(f.right)
			}
			if (i !== 1) {
				last.next = f
			}
			last = f
		}
	}
	return root
}
