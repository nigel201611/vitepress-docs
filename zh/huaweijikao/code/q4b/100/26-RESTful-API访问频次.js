// 26 RESTful API 访问频次统计

function main(n, urls, level, keyword) {
  let count = 0
  for (const url of urls) {
    const parts = url.split('/').filter(Boolean)
    if (parts.length >= level && parts[level - 1] === keyword) count++
  }
  return count
}

console.log(
  main(
    5,
    [
      '/huawei/computing/no/one',
      '/huawei/computing',
      '/huawei',
      '/huawei/cloud/no/one',
      '/huawei/wireless/no/one',
    ],
    2,
    'computing'
  )
)
