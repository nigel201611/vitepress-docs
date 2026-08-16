// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let len = strs.length
  if (!len) {
    return ''
  }
  let res = ''
  let word = strs[0]
  let j = 0
  while (j < word.length) {
    let char = word[j]
    let hasSame = false
    for (let i = 1; i < len; i++) {
      let tempW = strs[i]
      if (tempW[j] === char) {
        hasSame = true
      } else {
        hasSame = false
        break
      }
    }
    if (hasSame) {
      res += char
      j++
    } else {
      return res
    }
  }

  return res
}

console.log(longestCommonPrefix(['aa', 'ab']))

function longestCommonPrefix2(strs) {
  if (strs == null || strs.length == 0) {
    return ''
  }
  let prefix = strs[0]
  let count = strs.length
  for (let i = 1; i < count; i++) {
    prefix = commonPrefix(prefix, strs[i])
    if (prefix.length == 0) {
      break
    }
  }
  return prefix
}

function commonPrefix(str1, str2) {
  let length = Math.min(str1.length, str2.length)
  let index = 0
  while (index < length && str1.charAt(index) == str2.charAt(index)) {
    index++
  }
  return str1.substring(0, index)
}
