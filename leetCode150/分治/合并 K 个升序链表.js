// 给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 思路一：分治（两两归并）
// 类似归并排序：每轮把相邻的两个链表合并，链表个数每轮减半，合并 log k 轮。
// 每轮总元素数是 n，总复杂度 O(n log k)。

// 思路二：最小堆
// 把所有链表的头节点推进最小堆，每次弹出最小节点接到结果上，再把它所在链表的下一个节点入堆。
// 复杂度同样是 O(n log k)。本题用分治实现。

var mergeKLists = function (lists) {
  if (lists.length === 0) return null

  const mergeTwo = (l1, l2) => {
    const dummy = new ListNode(0)
    let tail = dummy
    while (l1 && l2) {
      if (l1.val <= l2.val) {
        tail.next = l1
        l1 = l1.next
      } else {
        tail.next = l2
        l2 = l2.next
      }
      tail = tail.next
    }
    tail.next = l1 || l2
    return dummy.next
  }

  while (lists.length > 1) {
    const merged = []
    for (let i = 0; i < lists.length; i += 2) {
      merged.push(mergeTwo(lists[i], lists[i + 1] || null))
    }
    lists = merged
  }
  return lists[0]
}
