/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// var strStr = function (haystack, needle) {
//   if (!haystack) {
//     return -1
//   }
//   if (!needle) {
//     return -1
//   }

//   let startIndex = -1

//   for (let i = 0; i < haystack.length; i++) {
//     let char = haystack[i]

//     if (char === needle[0]) {
//       startIndex = i
//       let j = 0
//       while (j < needle.length && needle[j] === haystack[i]) {
//         j++
//         i++
//       }
//       if (j >= needle.length) {
//         if (needle[--j] === haystack[--i]) {
//           break
//         }
//       }
//       i = startIndex
//       startIndex = -1
//     }
//   }

//   return startIndex
// }
var strStr = function (haystack, needle) {
  const n = haystack.length,
    m = needle.length
  for (let i = 0; i + m <= n; i++) {
    let flag = true
    for (let j = 0; j < m; j++) {
      if (haystack[i + j] != needle[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      return i
    }
  }
  return -1
}

console.log(strStr('sadbutsad', 'sad'))
