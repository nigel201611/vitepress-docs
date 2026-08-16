// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

// 示例 1:

// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:

// 输入: s = "rat", t = "car"
// 输出: false

// 方法一：排序

// t 是 s 的异位词等价于「两个字符串排序后相等」。
// 因此我们可以对字符串 s 和 t 分别排序，看排序后的字符串是否相等即可判断。
// 此外，如果 s 和 t 的长度不同，t 必然不是 s 的异位词。

// 方法二：哈希表

// 从另一个角度考虑，t 是 s 的异位词等价于「两个字符串中字符出现的种类和次数均相等」。
// 由于字符串只包含 26 个小写字母，因此我们可以维护一个长度为 26 的频次数组 table
// 先遍历记录字符串 sss 中字符出现的频次，然后遍历字符串 ttt，减去 table中对应的频次，如果出现 table[i]<0
// ，则说明 t 包含一个不在 s 中的额外字符，返回 false 即可。

var isAnagram = function (s, t) {
	if (s.length !== t.length) {
		return false
	}
	const table = new Array(26).fill(0)
	for (let i = 0; i < s.length; ++i) {
		table[s.codePointAt(i) - 'a'.codePointAt(0)]++
	}
	for (let i = 0; i < t.length; ++i) {
		table[t.codePointAt(i) - 'a'.codePointAt(0)]--
		if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
			return false
		}
	}
	return true
}
