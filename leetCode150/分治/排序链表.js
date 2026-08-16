// 给你链表的头结点 head ，请将其按升序排列并返回排序后的链表。要求时间复杂度 O(n log n)，空间复杂度 O(1)。

// 思路：归并排序（自顶向下）
// 1. 快慢指针找到链表中点，把链表切成两半
// 2. 递归排序两半
// 3. 合并两个有序链表
// 注意：找中点时 fast 从 head.next 出发，这样链表长度为偶数时 slow 停在左半末尾，才能正确切开。

var sortList = function (head) {
  if (!head || !head.next) return head

  // 快慢指针找中点
  let slow = head
  let fast = head.next
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  const mid = slow.next
  slow.next = null // 断开

  return merge(sortList(head), sortList(mid))
}

function merge(l1, l2) {
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
