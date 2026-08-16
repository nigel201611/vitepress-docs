// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。（即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

// 思路：BFS 层序遍历后反转
// 与「二叉树的层序遍历」完全一样，最后把结果数组反转即可。

var levelOrderBottom = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const size = queue.length
    const level = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.unshift(level) // 每层插到最前面
  }
  return result
}
