// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。

// 示例 1：

// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 示例 2：

// 输入：head = [1,1,1,2,3]
// 输出：[2,3]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
	if (!head) {
		return head
	}

	const dummy = new ListNode(0, head)

	let cur = dummy
	while (cur.next && cur.next.next) {
		if (cur.next.val === cur.next.next.val) {
			const x = cur.next.val
			while (cur.next && cur.next.val === x) {
				cur.next = cur.next.next
			}
		} else {
			cur = cur.next
		}
	}
	return dummy.next
}
