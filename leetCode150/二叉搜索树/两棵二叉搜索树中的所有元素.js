// 给你两棵二叉搜索树 root1 和 root2 ，请你返回一个列表，包含两棵树中的所有整数并按 升序 排序。

// 思路：中序遍历 + 归并
// 1. 中序遍历两棵树，各自得到递增数组
// 2. 归并两个有序数组（经典双指针合并）

var getAllElements = function (root1, root2) {
  const inorder = (root) => {
    const res = []
    const stack = []
    let node = root
    while (node || stack.length) {
      while (node) {
        stack.push(node)
        node = node.left
      }
      node = stack.pop()
      res.push(node.val)
      node = node.right
    }
    return res
  }

  const list1 = inorder(root1)
  const list2 = inorder(root2)

  const result = []
  let i = 0
  let j = 0
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
      result.push(list1[i++])
    } else {
      result.push(list2[j++])
    }
  }
  result.push(...list1.slice(i), ...list2.slice(j))
  return result
}
