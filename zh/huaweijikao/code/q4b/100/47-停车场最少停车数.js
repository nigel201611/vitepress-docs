// 47 停车场最少停车数
// 1表示有车位占用，0表示空。小车占1个车位、货车占2个、卡车占3个。
// 要求车辆数最少：连续的1（长度L）用尽量多的卡车（3位）填充，剩下1-2位再停一辆

function main(cars) {
  let count = 0
  let run = 0
  for (const c of cars) {
    if (c === 1) {
      run++
    } else {
      count += Math.ceil(run / 3)
      run = 0
    }
  }
  count += Math.ceil(run / 3)
  return count
}

console.log(main([1, 0, 1]))
