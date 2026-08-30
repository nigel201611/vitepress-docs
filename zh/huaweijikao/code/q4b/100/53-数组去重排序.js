// 53 数组去重排序: 去重后按出现次数从高到低排序, 次数相同按第一次出现顺序
// 输入: 以逗号分隔的数组

function main(arr) {
  const count = new Map()
  const first = new Map()
  for (let i = 0; i < arr.length; i++) {
    count.set(arr[i], (count.get(arr[i]) || 0) + 1)
    if (!first.has(arr[i])) first.set(arr[i], i)
  }
  const uniq = []
  for (const k of count.keys()) uniq.push(k)
  uniq.sort((a, b) => {
    if (count.get(a) !== count.get(b)) return count.get(b) - count.get(a)
    return first.get(a) - first.get(b)
  })
  return uniq.join(',')
}

console.log(main([1, 3, 3, 3, 2, 4, 4, 4, 5]))
