// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 示例 1：

// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]
// 示例 2：

// 输入：head = [1], n = 1
// 输出：[]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}
function removeNthFromEnd(head, n) {
	let dummy = new ListNode(0, head)
	let length = getLength(head)
	let cur = dummy
	for (let i = 1; i < length - n + 1; ++i) {
		cur = cur.next
	}
	cur.next = cur.next.next
	let ans = dummy.next
	return ans
}

function getLength(head) {
	let length = 0
	while (head != null) {
		++length
		head = head.next
	}
	return length
}
