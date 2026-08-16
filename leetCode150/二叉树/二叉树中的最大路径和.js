// 二叉树中的 路径 被定义为一条节点序列，该序列中任意相邻节点之间都存在父子关系。路径中至少包含一个节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。给你一个二叉树的根节点 root ，返回其 最大路径和 。

// 思路：后序遍历 DFS（树形 DP）
// 定义 dfs(node) 返回「从 node 向下延伸、以 node 为起点的一条单向路径的最大和」
// （node 在路径中只能向一个子节点方向继续延伸，即要么走左子树要么走右子树）。
// 全局变量 max 记录以任意节点为「拐点」的完整路径最大和：
//   max = Math.max(max, node.val + left + right)
// 其中 left/right 是左右子树贡献的最大值，负贡献直接取 0（不加比加更优）。
// 返回值 = node.val + Math.max(left, right)，供父节点继续向上组合。

var maxPathSum = function (root) {
  let max = -Infinity

  const dfs = (node) => {
    if (!node) return 0
    const left = Math.max(0, dfs(node.left)) // 负数贡献不如不选
    const right = Math.max(0, dfs(node.right))
    max = Math.max(max, node.val + left + right) // 以 node 为拐点的完整路径
    return node.val + Math.max(left, right) // 向上只能延伸一边
  }

  dfs(root)
  return max
}
