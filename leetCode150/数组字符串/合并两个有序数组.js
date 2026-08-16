/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// var merge = function (nums1, m, nums2, n) {
//   let res = []
//   let i = 0
//   let j = 0
//   let k = 0
//   while (i < m + n) {
//     if (nums1[j] && nums2[k]) {
//       if (nums1[j] < nums2[k]) {
//         res[i] = nums1[j++]
//       } else {
//         res[i] = nums2[k++]
//       }
//     } else if (nums1[j]) {
//       res[i] = nums1[j++]
//     } else if (nums2[k]) {
//       res[i] = nums2[k++]
//     }
//     i++
//   }

//   nums1 = res.slice()
//   return nums1
// }

var merge = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0
  const sorted = new Array(m + n).fill(0)
  var cur
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++]
    } else if (p2 === n) {
      cur = nums1[p1++]
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++]
    } else {
      cur = nums2[p2++]
    }
    sorted[p1 + p2 - 1] = cur
  }
  for (let i = 0; i != m + n; ++i) {
    nums1[i] = sorted[i]
  }
  return nums1
}



// 方法三：逆向双指针
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1,
    p2 = n - 1
  let tail = m + n - 1
  var cur
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--]
    } else if (p2 === -1) {
      cur = nums1[p1--]
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--]
    } else {
      cur = nums2[p2--]
    }
    nums1[tail--] = cur
  }
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
