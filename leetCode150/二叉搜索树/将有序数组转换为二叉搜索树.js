// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

// 思路：分治（取中点作为根）
// 有序数组中间的元素作为根，左半段构建左子树，右半段构建右子树，递归即可。
// 这样左右子树元素数量差不超过 1，自然满足高度平衡。

var sortedArrayToBST = function (nums) {
  const build = (left, right) => {
    if (left > right) return null
    const mid = (left + right) >> 1
    const node = new TreeNode(nums[mid])
    node.left = build(left, mid - 1)
    node.right = build(mid + 1, right)
    return node
  }
  return build(0, nums.length - 1)
}
