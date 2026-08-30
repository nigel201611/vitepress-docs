// 单词接龙

function main(words, k, n) {
  let res = ''
  let wordsArr = words.split(' ')
  let selectedWord = wordsArr[k]
  let endChar = selectedWord[selectedWord.length - 1]
  wordsArr.splice(k, 1)

  const len = wordsArr.length
  res += selectedWord
  let flag = true

  while (flag) {
    let choiceArr = wordsArr.filter((word) => word.startsWith(endChar))
    if (choiceArr && choiceArr.length) {
      choiceArr.sort(compare)
      selectedWord = choiceArr[0]
      wordsArr.splice(wordsArr.indexOf(selectedWord), 1)
      res += selectedWord
      endChar = selectedWord[selectedWord.length - 1]
    } else {
      flag = false
    }
  }
  return res
}

function compare(str1, str2) {
  let len1 = str1.length
  let len2 = str2.length
  if (len1 !== len2) {
    return len2 - len1
  } else {
    let i = 0
    let flag = 0
    while (i < len1) {
      if (str1.charCodeAt(i) < str2.charCodeAt(i)) {
        flag = -1
        break
      } else if (str1.charCodeAt(i) > str2.charCodeAt(i)) {
        flag = 1
        break
      }
      i++
    }
    return flag
  }
}

console.log(main('word dd da dc dword d', 4, 6))
console.log(main('word dd da dc dword d', 0, 6))
