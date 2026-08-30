// 第 26 题:派遣员工找最小k
// x国需要cntx名员工,y国需要cnty名员工,员工号从1开始连续(1,2,3,...)。
// 从[1,k]中选择员工派遣:编号为x的倍数的员工不能去x国,编号为y的倍数的员工不能去y国。
// x、y均为质数(x<=y),求满足两国需求的最小的k。
// 对给定的k分类统计:
//   同时是x、y倍数的员工(数量 v = floor(k/(x*y)),因为x、y互质即最小公倍数=xy)两国都不能去;
//   仅x的倍数(onlyX)只能去y国;仅y的倍数(onlyY)只能去x国;
//   其余(free)两国皆可派遣。
// 因此可行 <=> cntx <= onlyY + free 且 cnty <= onlyX + free。
// 可行性关于k单调(人数只增不减),二分答案即可。
function main(x, y, cntx, cnty) {
  const can = (k) => {
    const both = Math.floor(k / (x * y))
    const onlyX = Math.floor(k / x) - both
    const onlyY = Math.floor(k / y) - both
    const free = k - onlyX - onlyY - both
    return onlyY + free >= cntx && onlyX + free >= cnty
  }
  let lo = 0
  let hi = 2000000000
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (can(mid)) hi = mid
    else lo = mid + 1
  }
  return lo
}

console.log(main(2, 3, 3, 1))
