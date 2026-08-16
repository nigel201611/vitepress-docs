// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

// 方法一：滑动窗口

// 思路

// 根据题目要求，我们需要在字符串 s 寻找字符串 p的异位词。因为字符串 p 的异位词的长度一定与字符串 p 的长度相同，
// 所以我们可以在字符串 s 中构造一个长度为与字符串 p 的长度相同的滑动窗口，并在滑动中维护窗口中每种字母的数量；
// 当窗口中每种字母的数量与字符串 p 中每种字母的数量相同时，则说明当前窗口为字符串 p 的异位词。

// 算法

// 在算法的实现中，我们可以使用数组来存储字符串 p 和滑动窗口中每种字母的数量。

// 细节

// 当字符串 s 的长度小于字符串 p 的长度时，字符串 s 中一定不存在字符串 p 的异位词。
// 但是因为字符串 s 中无法构造长度与字符串 p 的长度相同的窗口，所以这种情况需要单独处理。

var findAnagrams = function (s, p) {
	const sLen = s.length,
		pLen = p.length

	if (sLen < pLen) {
		return []
	}

	const ans = []
	const sCount = new Array(26).fill(0)
	const pCount = new Array(26).fill(0)
	for (let i = 0; i < pLen; ++i) {
		++sCount[s[i].charCodeAt() - 'a'.charCodeAt()]
		++pCount[p[i].charCodeAt() - 'a'.charCodeAt()]
	}

	if (sCount.toString() === pCount.toString()) {
		ans.push(0)
	}

	for (let i = 0; i < sLen - pLen; ++i) {
		--sCount[s[i].charCodeAt() - 'a'.charCodeAt()]
		++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()]

		if (sCount.toString() === pCount.toString()) {
			ans.push(i + 1)
		}
	}

	return ans
}
