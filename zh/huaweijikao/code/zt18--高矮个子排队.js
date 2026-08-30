// 高矮个子排队
function main(num) {
  let arr = num.split(' ')
  let idx = 0
  while (idx + 1 < arr.length) {
    //原则奇数位大 偶数位小
    if ((idx + 1) % 2 == 0) {
      //idx + 1 % 2===0 说明idx在数组中的位置是偶数位置，从0开始的表示第一位奇数
      if (arr[idx] > arr[idx + 1]) {
        let tem = arr[idx + 1]
        arr[idx + 1] = arr[idx]
        arr[idx] = tem
      }
    } else {
      //0算奇数位 idx要大
      if (arr[idx] < arr[idx + 1]) {
        let tem = arr[idx + 1]
        arr[idx + 1] = arr[idx]
        arr[idx] = tem
      }
    }
    idx++
  }

  return arr
}

console.log(main('4 1 3 5 2'))
