// 44 RSA因数分解
// 给定一个32位正整数，分解成两个素数的乘积，从小到大输出；失败输出 -1 -1

function isPrime(x) {
  if (x < 2) return false
  for (let i = 2; i * i <= x; i++) {
    if (x % i === 0) return false
  }
  return true
}

function main(num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0 && isPrime(i) && isPrime(num / i)) {
      return (i < num / i ? i : num / i) + ' ' + (i > num / i ? i : num / i)
    }
  }
  return '-1 -1'
}

console.log(main(15))
