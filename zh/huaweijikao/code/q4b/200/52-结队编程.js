// 52. 结队编程
// 输入：员工总数 n，以及依次排列的员工职级 level
// 统计满足 level[i] < level[j] < level[k] 或 level[i] > level[j] > level[k]（0<=i<j<k<n）的三元组数量
function main(n, level) {
  const M = 100000
  const bitL = new Array(M + 2).fill(0)
  const bitR = new Array(M + 2).fill(0)
  const add = (bit, i, v) => {
    for (; i <= M; i += i & -i) bit[i] += v
  }
  const sum = (bit, i) => {
    let s = 0
    for (; i > 0; i -= i & -i) s += bit[i]
    return s
  }
  for (const x of level) add(bitR, x, 1)
  let ans = 0
  for (let j = 0; j < n; j++) {
    add(bitR, level[j], -1)
    const leftLess = sum(bitL, level[j] - 1)
    const leftGreater = j - leftLess
    const rightLess = sum(bitR, level[j] - 1)
    const rightGreater = n - 1 - j - rightLess
    ans += leftLess * rightGreater + leftGreater * rightLess
    add(bitL, level[j], 1)
  }
  return ans
}

console.log(main(4, [1, 2, 3, 4]))
