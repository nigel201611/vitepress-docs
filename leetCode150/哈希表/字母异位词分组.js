// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 示例 1:

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 方法一：排序

// 由于互为字母异位词的两个字符串包含的字母相同，因此对两个字符串分别进行排序之后得到的字符串一定是相同的，
// 故可以将排序之后的字符串作为哈希表的键。

var groupAnagrams = function (strs) {
	const map = new Map()
	for (let str of strs) {
		let array = Array.from(str)
		array.sort()
		let key = array.toString()
		let list = map.get(key) ? map.get(key) : new Array()
		list.push(str)
		map.set(key, list)
	}
	return Array.from(map.values())
}
// 方法二：计数

// 由于互为字母异位词的两个字符串包含的字母相同，因此两个字符串中的相同字母出现的次数一定是相同的，
// 故可以将每个字母出现的次数使用字符串表示，作为哈希表的键。

// 由于字符串只包含小写字母，因此对于每个字符串，可以使用长度为 26 的数组记录每个字母出现的次数。
// 需要注意的是，在使用数组作为哈希表的键时，不同语言的支持程度不同，因此不同语言的实现方式也不同。

var groupAnagrams = function (strs) {
	const map = new Object()
	for (let s of strs) {
		const count = new Array(26).fill(0)
		for (let c of s) {
			count[c.charCodeAt() - 'a'.charCodeAt()]++
		}
		map[count] ? map[count].push(s) : (map[count] = [s])
	}
	return Object.values(map)
}
