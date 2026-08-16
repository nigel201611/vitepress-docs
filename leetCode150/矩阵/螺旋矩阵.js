// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 示例 1：

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

// 方法一：模拟

// 可以模拟螺旋矩阵的路径。初始位置是矩阵的左上角，初始方向是向右，当路径超出界限或者进入之前访问过的位置时，
// 顺时针旋转，进入下一个方向。

// 判断路径是否进入之前访问过的位置需要使用一个与输入矩阵大小相同的辅助矩阵 visited，
// 其中的每个元素表示该位置是否被访问过。当一个元素被访问时，将 visited 中的对应位置的元素设为已访问。

// 如何判断路径是否结束？由于矩阵中的每个元素都被访问一次，因此路径的长度即为矩阵中的元素数量，
// 当路径的长度达到矩阵中的元素数量时即为完整路径，将该路径返回。

var spiralOrder = function (matrix) {
	if (!matrix.length || !matrix[0].length) {
		return []
	}
	const rows = matrix.length,
		columns = matrix[0].length
	const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false))
	const total = rows * columns
	const order = new Array(total).fill(0)

	let directionIndex = 0,
		row = 0,
		column = 0
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	]
	for (let i = 0; i < total; i++) {
		order[i] = matrix[row][column]
		visited[row][column] = true
		const nextRow = row + directions[directionIndex][0],
			nextColumn = column + directions[directionIndex][1]
		if (
			!(
				0 <= nextRow &&
				nextRow < rows &&
				0 <= nextColumn &&
				nextColumn < columns &&
				!visited[nextRow][nextColumn]
			)
		) {
			directionIndex = (directionIndex + 1) % 4
		}
		row += directions[directionIndex][0]
		column += directions[directionIndex][1]
	}
	return order
}
