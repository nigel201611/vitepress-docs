// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// 思路：分组反转 + 哨兵节点
// 维护 prev（上一组的末尾），每轮：
// 1. 让 tail 从 prev 出发走 k 步，走不到说明剩余不足 k 个，直接返回
// 2. 记录 next = tail.next（下一组的头），记录 start = prev.next（本组头）
// 3. 反转 [start, tail]：逐个把节点接到「尾巴后面」，用 next 作为终止边界
// 4. 把 start 变成新的 prev，继续下一轮

var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0, head)
  let prev = dummy

  while (true) {
    let tail = prev
    for (let i = 0; i < k; i++) {
      tail = tail.next
      if (!tail) return dummy.next // 剩余不足 k 个
    }

    const next = tail.next // 下一组起点
    const start = prev.next // 本组起点

    // 头插法反转本组
    let cur = start
    let prevNode = next
    while (cur !== next) {
      const temp = cur.next
      cur.next = prevNode
      prevNode = cur
      cur = temp
    }

    prev.next = tail // 上一组末尾接到本组新头部
    prev = start // 本组新的末尾作为下一组的 prev
  }
}
