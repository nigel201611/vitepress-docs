// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

// 示例 1：

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[[7,4,1],[8,5,2],[9,6,3]]

// 方法二：原地旋转

// 题目中要求我们尝试在不使用额外内存空间的情况下进行矩阵的旋转，也就是说，我们需要「原地旋转」这个矩阵。
// 那么我们如何在方法一的基础上完成原地旋转呢？

// 我们观察方法一中的关键等式：

// matrixnew[col][n−row−1]=matrix[row][col]

// 当我们知道了如何原地旋转矩阵之后，还有一个重要的问题在于：我们应该枚举哪些位置 (row,col)
// 进行上述的原地交换操作呢？由于每一次原地交换四个位置，因此：

// 当 n 为偶数时，我们需要枚举 n2/4=(n/2)×(n/2)  个位置，可以将该图形分为四块

// 保证了不重复、不遗漏；

// 当 n 为奇数时，由于中心的位置经过旋转后位置不变，我们需要枚举 (n2−1)/4=((n−1)/2)×((n+1)/2) 个位置，
// 需要换一种划分的方式

var rotate = function (matrix) {
	const n = matrix.length
	for (let i = 0; i < Math.floor(n / 2); ++i) {
		for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
			const temp = matrix[i][j]
			matrix[i][j] = matrix[n - j - 1][i]
			matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
			matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
			matrix[j][n - i - 1] = temp
		}
	}
}
// 方法三：用翻转代替旋转
var rotate = function (matrix) {
	const n = matrix.length
	// 水平翻转
	for (let i = 0; i < Math.floor(n / 2); i++) {
		for (let j = 0; j < n; j++) {
			;[matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]]
		}
	}
	// 主对角线翻转
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < i; j++) {
			;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
		}
	}
}
