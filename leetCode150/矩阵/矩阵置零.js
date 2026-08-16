// 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

// 示例 1：

// 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
// 输出：[[1,0,1],[0,0,0],[1,0,1]]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// var setZeroes = function (matrix) {
// 	if (!matrix.length || !matrix[0].length) {
// 		return []
// 	}
// 	let rows = matrix.length
// 	let columns = matrix[0].length
// 	let visited = new Array(rows).fill(0).map((item) => new Array(columns).fill(false))

// 	for (let i = 0; i < rows; i++) {
// 		for (let j = 0; j < columns; j++) {
// 			if (visited[i][j]) {
// 				continue
// 			}
// 			visited[i][j] = true
// 			if (matrix[i][j] === 0) {
// 				for (let k = 0; k < columns; k++) {
// 					if (matrix[i][k] !== 0) {
// 						matrix[i][k] = 0
// 						visited[i][j] = true
// 					}
// 				}

// 				for (let k = 0; k < rows; k++) {
// 					if (matrix[k][j] !== 0) {
// 						matrix[k][j] = 0
// 						visited[i][j] = true
// 					}
// 				}
// 			}
// 		}
// 	}

// 	return matrix
// }

// 方法一：使用标记数组

// 思路和算法

// 我们可以用两个标记数组分别记录每一行和每一列是否有零出现。

// 具体地，我们首先遍历该数组一次，如果某个元素为 0，那么就将该元素所在的行和列所对应标记数组的位置置为 true。
// 最后我们再次遍历该数组，用标记数组更新原数组即可。

var setZeroes = function (matrix) {
	const m = matrix.length,
		n = matrix[0].length
	const row = new Array(m).fill(false)
	const col = new Array(n).fill(false)
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (matrix[i][j] === 0) {
				row[i] = col[j] = true
			}
		}
	}
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (row[i] || col[j]) {
				matrix[i][j] = 0
			}
		}
	}
}

// 方法二：使用两个标记变量

// 思路和算法

// 我们可以用矩阵的第一行和第一列代替方法一中的两个标记数组，以达到 O(1)的额外空间。
// 但这样会导致原数组的第一行和第一列被修改，无法记录它们是否原本包含 0。因此我们需要额外使用两个标记变量分别记录第一行和第一列是否原本包含 000。

// 在实际代码中，我们首先预处理出两个标记变量，接着使用其他行与列去处理第一行与第一列，
// 然后反过来使用第一行与第一列去更新其他行与列，最后使用两个标记变量更新第一行与第一列即可。

var setZeroes = function (matrix) {
	const m = matrix.length,
		n = matrix[0].length
	let flagCol0 = false,
		flagRow0 = false
	for (let i = 0; i < m; i++) {
		if (matrix[i][0] === 0) {
			flagCol0 = true
		}
	}
	for (let j = 0; j < n; j++) {
		if (matrix[0][j] === 0) {
			flagRow0 = true
		}
	}
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = matrix[0][j] = 0
			}
		}
	}
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0
			}
		}
	}
	if (flagCol0) {
		for (let i = 0; i < m; i++) {
			matrix[i][0] = 0
		}
	}
	if (flagRow0) {
		for (let j = 0; j < n; j++) {
			matrix[0][j] = 0
		}
	}
}

console.log(
	setZeroes([
		[0, 1, 2, 0],
		[3, 4, 5, 2],
		[1, 3, 1, 5],
	])
)
