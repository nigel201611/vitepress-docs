// 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。

// 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
// 示例1:

// 输入: pattern = "abba", s = "dog cat cat dog"
// 输出: true

// 方法一：哈希表

// 思路及解法

// 在本题中，我们需要判断字符与字符串之间是否恰好一一对应。即任意一个字符都对应着唯一的字符串，
// 任意一个字符串也只被唯一的一个字符对应。在集合论中，这种关系被称为「双射」。

// 想要解决本题，我们可以利用哈希表记录每一个字符对应的字符串，以及每一个字符串对应的字符。
// 然后我们枚举每一对字符与字符串的配对过程，不断更新哈希表，如果发生了冲突，则说明给定的输入不满足双射关系。

// 在实际代码中，我们枚举 pattern 中的每一个字符，利用双指针来均摊线性地找到该字符在 str 中对应的字符串。
// 每次确定一个字符与字符串的组合，我们就检查是否出现冲突，最后我们再检查两字符串是否比较完毕即可。
var wordPattern = function (pattern, s) {
	const word2ch = new Map()
	const ch2word = new Map()
	const words = s.split(' ')
	if (pattern.length !== words.length) {
		return false
	}
	for (const [i, word] of words.entries()) {
		const ch = pattern[i]
		if (
			(word2ch.has(word) && word2ch.get(word) != ch) ||
			(ch2word.has(ch) && ch2word.get(ch) !== word)
		) {
			return false
		}
		word2ch.set(word, ch)
		ch2word.set(ch, word)
	}
	return true
}
