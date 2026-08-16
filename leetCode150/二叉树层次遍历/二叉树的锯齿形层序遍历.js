// 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 思路：BFS 层序遍历 + 方向交替
// 标准层序遍历，维护 leftToRight 布尔值：
// 从左到右时正常 push，从右到左时 unshift 到层数组头部。
// 每处理完一层翻转方向。

var zigzagLevelOrder = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  let leftToRight = true

  while (queue.length) {
    const size = queue.length
    const level = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (leftToRight) {
        level.push(node.val)
      } else {
        level.unshift(node.val)
      }
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
    leftToRight = !leftToRight
  }
  return result
}
