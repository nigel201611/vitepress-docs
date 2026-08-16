var isPalindrome = function (s) {
  let str = s.replace(/[^a-zA-Z0-9]/g, '')
  str = str.toLowerCase()

  let left = 0
  let right = str.length - 1
  let flag = true
  while (left < right) {
    if (str[left] === str[right]) {
      left++
      right--
    } else {
      flag = false
      break
    }
  }

  return flag
}

console.log(isPalindrome('A man, a plan, a canal: Panama'))
