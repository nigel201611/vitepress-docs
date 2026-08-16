// 给定一个 完美二叉树（所有叶子节点都在同一层，每个父节点都有两个子节点），其所有叶子节点都在同一层，每个父节点都有两个子节点。
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 初始状态下，所有 next 指针都被设置为 NULL。

// 思路：利用已建立的 next 指针逐层下移（O(1) 额外空间）
// 最左边节点 leftmost 开始，沿链表向右走（head = head.next）：
//   1. head.left.next = head.right：同一父节点的左右子节点相连
//   2. 若 head.next 存在，head.right.next = head.next.left：跨父节点的右子节点连到下一父节点的左子节点
// 一层处理完，leftmost = leftmost.left 进入下一层。

var connect = function (root) {
  if (!root) return root
  let leftmost = root
  while (leftmost.left) {
    let head = leftmost
    while (head) {
      head.left.next = head.right
      if (head.next) {
        head.right.next = head.next.left
      }
      head = head.next
    }
    leftmost = leftmost.left
  }
  return root
}
