// 25 航班排序

function main(line) {
  return line
    .split(',')
    .sort()
    .join(',')
}

console.log(main('CA3385,CZ6678,SC6508,DU7523,HK4456,MK0987'))
