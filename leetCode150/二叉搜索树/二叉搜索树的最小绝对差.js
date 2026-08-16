// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
// 差值是一个正数，其数值等于两值之差的绝对值。

// 思路：中序遍历
// 二叉搜索树中序遍历结果递增，任意两节点最小差值一定出现在相邻元素之间。
// 中序遍历时记录前一个节点的值，逐个求差取最小。

var getMinimumDifference = function (root) {
  let prev = null
  let minDiff = Infinity

  const inorder = (node) => {
    if (!node) return
    inorder(node.left)
    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev)
    }
    prev = node.val
    inorder(node.right)
  }

  inorder(root)
  return minDiff
}
