// 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

// 你应当 保留 两个分区中每个节点的初始相对位置。

// 示例 1：

// 输入：head = [1,4,3,2,5,2], x = 3
// 输出：[1,2,2,4,3,5]

// 方法一：模拟

// 直观来说我们只需维护两个链表 small 和 large 即可，small 链表按顺序存储所有小于 xxx 的节点，
// large 链表按顺序存储所有大于等于 x 的节点。遍历完原链表后，我们只要将 small 链表尾节点指向
// large 链表的头节点即能完成对链表的分隔。

// 为了实现上述思路，我们设 smallHead 和 largeHead 分别为两个链表的哑节点，

// 即它们的 next 指针指向链表的头节点，这样做的目的是为了更方便地处理头节点为空的边界条件。
// 同时设 small 和 large 节点指向当前链表的末尾节点。开始时 smallHead=small,largeHead=large 指针指向该节点。

// 遍历结束后，我们将 large 的 next 指针置空，这是因为当前节点复用的是原链表的节点，
// 而其 next 指针可能指向一个小于 x 的节点，我们需要切断这个引用。同时将 small 的 next 指针指向 largeHead 的
// next 指针指向的节点，即真正意义上的 large 链表的头节点。最后返回 smallHead 的 next 指针即为我们要求的答案。
var partition = function (head, x) {
	let small = new ListNode(0)
	const smallHead = small
	let large = new ListNode(0)
	const largeHead = large
	while (head !== null) {
		if (head.val < x) {
			small.next = head
			small = small.next
		} else {
			large.next = head
			large = large.next
		}
		head = head.next
	}
	large.next = null
	small.next = largeHead.next
	return smallHead.next
}
