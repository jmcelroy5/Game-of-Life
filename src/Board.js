import React, { Component, PropTypes } from 'react';
import './Board.css';

var FIRST_GEN_COLOR = '#c57575'
, SURVIVOR_COLOR = '#ee4444'

class Board extends Component {
	static propTypes = {
		matrix: PropTypes.array
	, width: PropTypes.number
	, height: PropTypes.number
	, cellSize: PropTypes.number
	, onChange: PropTypes.func
	, onClear: PropTypes.func
	}

	componentDidMount () {
		this.canvas = document.getElementById('board')
		this.context = this.canvas.getContext('2d')

		this.context.strokeStyle = 'white'

		this.drawGridLines()
	}

	componentWillReceiveProps (props) {
		this.updateBoard(props)
	}

	drawGridLines () {
		for (var x = 0; x <= this.props.width; x += this.props.cellSize) {
			var currentX = this.props.cellSize + x
			this.context.moveTo(currentX, 0)
			this.context.lineTo(currentX, this.props.height)
		}

		for (var y = 0; y <= this.props.height; y += this.props.cellSize) {
			var currentY = this.props.cellSize + y
			this.context.moveTo(0, currentY)
			this.context.lineTo(this.props.width, currentY)
		}

		this.context.stroke()
	}

	updateBoard (matrix) {
		this.wipeBoard()

		const aliveCells = this.props.matrix.forEach((row) => {
			row.filter((cell) => cell.alive)
				.forEach((cell) => {
					const cellColor = cell.alive > 1 ? SURVIVOR_COLOR : FIRST_GEN_COLOR
					this.fillSquare({x: cell.x, y: cell.y}, cellColor)
				})
		})
	}

	wipeBoard () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.context.stroke()
	}

	fillSquare ({x, y}, color) {
		this.context.fillStyle = color
		const xCanvas = x * this.props.cellSize
		const yCanvas = y * this.props.cellSize
		this.context.fillRect(xCanvas, yCanvas, this.props.cellSize, this.props.cellSize)
	}

	onCellClick (e) {
		var xClick = e.pageX - this.canvas.offsetLeft 
		var yClick = e.pageY - this.canvas.offsetTop

		var x = Math.floor(xClick / this.props.cellSize)
		var y = Math.floor(yClick / this.props.cellSize)

		this.props.onChange({x, y})
	}

	render () {
		return (<canvas
			id="board"
			width={`${this.props.width}px`} 
			height={`${this.props.height}px`} 
			className="Board"
			onClick={this.onCellClick.bind(this)} 
		/>)
	}
}

export default Board