// 给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。

//  s 中的 串联子串 是指一个包含  words 中所有字符串以任意顺序排列连接起来的子串。

// 例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"， "cdefab"，"efabcd"， 和 "efcdab" 都是串联子串。 "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
// 返回所有串联子串在 s 中的开始索引。你可以以 任意顺序 返回答案。

// 此题是「438. 找到字符串中所有字母异位词」的进阶版。不同的是第 438 题的元素是字母，而此题的元素是单词。可以用类似「438.
// 找到字符串中所有字母异位词的官方题解」的方法二的滑动窗口来解这题。

// 记 words长度 m，words中每个单词的长度为 n，s 的长度为 ls。首先需要将 s 划分为单词组，每个单词的大小均为 n （首尾除外）。
// 这样的划分方法有 n 种，即先删去前 i （i=0∼n−1）个字母后，将剩下的字母进行划分，如果末尾有不到 n 个字母也删去。
// 对这 n 种划分得到的单词数组分别使用滑动窗口对 words 进行类似于「字母异位词」的搜寻。

// 划分成单词组后，一个窗口包含 s 中前 m 个单词，用一个哈希表 differ 表示窗口中单词频次和 words 中单词频次之差。初始化 differ 时，
// 出现在窗口中的单词，每出现一次，相应的值增加 1，出现在 words中的单词，每出现一次，相应的值减1。然后将窗口右移，
// 右侧会加入一个单词，左侧会移出一个单词，并对 differ 做相应的更新。窗口移动时，若出现 differ中值不为 0的键的数量为 0，则表示这个窗口中的单词频次和 words中单词频次相同，
// 窗口的左端点是一个待求的起始位置。划分的方法有 n 种，做 n 次滑动窗口后，即可找到所有的起始位置。

var findSubstring = function (s, words) {
	const res = []
	const m = words.length,
		n = words[0].length,
		ls = s.length
	for (let i = 0; i < n; i++) {
		if (i + m * n > ls) {
			break
		}
		const differ = new Map()
		for (let j = 0; j < m; j++) {
			const word = s.substring(i + j * n, i + (j + 1) * n)
			differ.set(word, (differ.get(word) || 0) + 1)
		}
		for (const word of words) {
			differ.set(word, (differ.get(word) || 0) - 1)
			if (differ.get(word) === 0) {
				differ.delete(word)
			}
		}
		for (let start = i; start < ls - m * n + 1; start += n) {
			if (start !== i) {
				let word = s.substring(start + (m - 1) * n, start + m * n)
				differ.set(word, (differ.get(word) || 0) + 1)
				if (differ.get(word) === 0) {
					differ.delete(word)
				}
				word = s.substring(start - n, start)
				differ.set(word, (differ.get(word) || 0) - 1)
				if (differ.get(word) === 0) {
					differ.delete(word)
				}
			}
			if (differ.size === 0) {
				res.push(start)
			}
		}
	}
	return res
}
