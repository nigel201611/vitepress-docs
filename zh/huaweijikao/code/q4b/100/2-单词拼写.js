// 2 单词拼写：words数组 + chars(含?万能字符) -> 掌握的单词个数

function main(words, chars) {
  const have = new Array(26).fill(0)
  let wild = 0
  for (const ch of chars) {
    if (ch === '?') {
      wild++
    } else {
      have[ch.charCodeAt(0) - 97]++
    }
  }
  let count = 0
  for (const word of words) {
    const need = new Array(26).fill(0)
    for (const ch of word) {
      need[ch.charCodeAt(0) - 97]++
    }
    let deficit = 0
    for (let i = 0; i < 26; i++) {
      if (need[i] > have[i]) {
        deficit += need[i] - have[i]
      }
    }
    if (deficit <= wild) {
      count++
    }
  }
  return count
}

console.log(main(['cat', 'bt', 'hat', 'tree'], 'atach??'))
